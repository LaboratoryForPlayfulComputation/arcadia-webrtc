declare namespace YT {

    class Player {
        constructor(element: string, options: PlayerOptions);
        cueVideoById(id: string): void;
        setPlaybackRate(rate: number): void;
        seekTo(rate: number): void;
        getCurrentTime(): number;
        setVolume(value: number): void;
        playVideo(): void;
        pauseVideo(): void;
        stopVideo(): void;
        mute(): void;
        unMute(): void;
    }

    interface PlayerOptions {
        width: number;
        height: number;
        videoId: string;
        playerVars: PlayerVarsOptions;
        events: PlayerEventsOptions;
    }

    interface PlayerVarsOptions {
        color: string;
        playlist?: string;      
    }

    interface PlayerEventsOptions {
        onReady: () => void;
    }

}