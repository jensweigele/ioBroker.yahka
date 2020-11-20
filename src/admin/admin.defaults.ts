import { Configuration } from '../shared/yahka.configuration';

export module Defaults {

    export let defaultCommandLine: Configuration.ICameraFfmpegCommandLine =
    {
        stream: [
            '-nostats',
            '-nostdin',
            '-y',
            '-re',
            '-i', '${source}',
            '-an', '-sn', '-dn',
            '-codec:v', '${codec}',
            '-pix_fmt', 'yuv420p',
            '-r', '${fps}',
            '-f', 'rawvideo',
            '-tune', 'zerolatency',
            '-vf', 'scale=${width}:${height}',
            '-b:v', '${bitrate}k',
            '-bufsize', '${bitrate}k',
            '-payload_type', '${payloadtype}',
            '-ssrc', '${targetVideoSsrc}',
            '-f', 'rtp',
            '-srtp_out_suite', 'AES_CM_128_HMAC_SHA1_80',
            '-srtp_out_params', '${videokey}',
            'srtp://${targetAddress}:${targetVideoPort}?rtcpport=${targetVideoPort}&localrtcpport=${targetVideoPort}&pkt_size=${mtu}'
        ],
        streamAudio: [
            '-vn', '-sn', '-dn',
            '-codec:a',
            'libfdk_aac',
            '-profile:a',
            'aac_eld',
            '-flags',
            '+global_header',
            '-f',
            'null',
            '-ar',
            '${samplerate}k',
            '-b:a',
            '${bitrate}k',
            '-bufsize:a',
            '${bitrate}k',
            '-ac',
            '${channel}',
            '-payload_type',
            '${payloadtype}',
            '-ssrc',
            '${targetAudioSsrc}',
            '-f',
            'rtp',
            '-srtp_out_suite',
            'AES_CM_128_HMAC_SHA1_80',
            '-srtp_out_params',
            '${audiokey}',
            'srtp://${targetAddress}:${targetAudioPort}?rtcpport=${targetAudioPort}&localrtcpport=${targetAudioPort}&pkt_size=188'
        ],
        snapshot: [
            '-re',
            '-i', '${source}',
            '-t', '1',
            '-s', '${width}x${height}',
            '-f', 'image2',
            '-'
        ]
    };
    export let webcamCommandLine: Configuration.ICameraFfmpegCommandLine = {
        stream: [
            '-re',
            '-f', 'dshow',
            '-i', '${source}',
            '-threads', '0',
            '-vcodec', '${codec}',
            '-an',
            '-pix_fmt', 'yuv420p',
            '-r', '${fps}',
            '-f', 'rawvideo',
            '-tune', 'zerolatency',
            '-vf', 'scale=${width}:${height}',
            '-b:v', '${bitrate}k',
            '-bufsize', '${bitrate}k',
            '-payload_type', '99',
            '-ssrc', '${targetVideoSsrc}',
            '-f', 'rtp',
            '-srtp_out_suite', 'AES_CM_128_HMAC_SHA1_80',
            '-srtp_out_params', '${videokey}',
            'srtp://${targetAddress}:${targetVideoPort}?rtcpport=${targetVideoPort}&localrtcpport=${targetVideoPort}&pkt_size=1378'
        ],
        streamAudio: [],
        snapshot: [
            '-re',
            '-f', 'dshow',
            '-i', '${source}',
            '-t', '1',
            '-s', '${width}x${height}',
            '-f', 'image2',
            '-'
        ]
    }

    export const ffmpegCommandLines = {
        default: defaultCommandLine,
        webcam: webcamCommandLine
    }
}

