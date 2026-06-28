import initChromecastMux from '@mux/mux-data-chromecast';

// Declare standard Google Cast namespace for TypeScript compilation
declare const cast: any;

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();
let firstPlay = true;

// Retrieve safe player init time
const playerInitTime = (initChromecastMux as any).utils?.now 
  ? (initChromecastMux as any).utils.now() 
  : Date.now();

playerManager.setMessageInterceptor(cast.framework.messages.MessageType.LOAD, (loadRequestData: any) => {
  const media = loadRequestData.media || {};
  const metadata = media.metadata || {};

  const videoId = media.contentId || 'unknown-chromecast-video';
  const videoTitle = metadata.title || 'Untitled Chromecast Stream';

  // Retrieve public Mux environment key from environment variables
  const envKey = (import.meta as any).env.VITE_MUX_ENV_KEY || "YOUR_MUX_ENV_KEY";

  if (firstPlay) {
    firstPlay = false;

    try {
      initChromecastMux(playerManager, {
        debug: true, // Enable console debugging on Chromecast
        data: {
          env_key: envKey,
          player_name: 'Eterna Custom Chromecast Player',
          player_init_time: playerInitTime,
          video_id: videoId,
          video_title: videoTitle,
          video_stream_type: 'on-demand',
        }
      });
      console.log(`[Mux Data] Initialized Chromecast monitoring for first play: "${videoTitle}"`);
    } catch (err) {
      console.error('[Mux Data] Error during Chromecast init:', err);
    }
  } else {
    // If subsequent videos are loaded in the same receiver session, emit a videochange event
    try {
      if (playerManager.mux && typeof playerManager.mux.emit === 'function') {
        playerManager.mux.emit('videochange', {
          video_id: videoId,
          video_title: videoTitle,
          video_stream_type: 'on-demand'
        });
        console.log(`[Mux Data] Emitted videochange to update stream: "${videoTitle}"`);
      }
    } catch (err) {
      console.error('[Mux Data] Error during videochange emission:', err);
    }
  }

  return loadRequestData;
});

// Start the Cast Receiver
context.start();
console.log('Eterna Cast Receiver Engine and Mux Data Agent initialized successfully.');
