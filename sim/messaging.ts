namespace pxsim.messaging {
    
    let peer : any = null;
    let connections : any = {};

    var script = document.createElement('script');
    script.onload = function () {
        initializePeer();
    };
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/peerjs/0.3.14/peer.js";
    document.head.appendChild(script);

    function updateUserId(id : string){
        let userId = parent.document.getElementById("userid");
        (userId as any).value = id.toString();
    }

    function initDataConnectionCallbacks(conn: PeerJs.DataConnection){
        connections[conn.peer] = conn;
        conn.on('data', function(data: any){
            board().bus.queue(data["key"], 0x1);
        });
        conn.on('close', function() {connections[conn.peer] = undefined;});
        conn.on('error', function() {connections[conn.peer] = undefined;});  
    }

    function initializePeer(){
        /* Create instance of PeerJS */
        peer = new Peer({
            host: 'liminal-jam.herokuapp.com',
            secure: true,
            port: 443,
            key: 'peerjs',
            debug: 3});

        /* Received user ID from server */
        if (peer) peer.on('open', function(id : string) { 
            if (id)
                updateUserId(id); 
            else if (peer.id)
                updateUserId(peer.id); 
        });
        else initializePeer();
        if (peer) peer.on('close', function() { });
        else initializePeer();
        if (peer) peer.on('disconnected', function() { 
            console.log("peer disconnecteeeeeed from server");
            peer.reconnect();
        });
        else initializePeer();
        if (peer) peer.on('error', function(err: any) { });
        else initializePeer();
        
        /* Successfully created data connection */
        if (peer) peer.on('connection', function(conn: PeerJs.DataConnection) { initDataConnectionCallbacks(conn); });
        else initializePeer();
    }

    /**
     * Peer
     * @param id The value of the marker
     */
    //% blockId=peer_block block="send key %key| value %value| to %id"
    //% blockNamespace=messaging inBasicCategory=true
    //% weight=100
    export function send(key: string, value: number, id: string) { 
        if (peer){
            let conn = connections[id];
            if(!conn || !conn.open){
                conn = peer.connect(id);
                conn.on('open', function(){
                    initDataConnectionCallbacks(conn);      
                    conn.send({"key": key, "value": value});
                });                    
            }
            conn.send({"key": key, "value": value});
        } else {
            initializePeer();
            send(key, value, id);
        }
    } 

    /**
     * Allows user to define callbacks for receive event
     * @param key 
     */
    //% blockId=peer_receive block="when I receive key %key|do" blockGap=8
    //% blockNamespace=messaging inBasicCategory=true
    //% weight=99    
    export function receive(key: string, handler: RefAction) {
        board().bus.listen(key, 0x1, handler);
    }

}