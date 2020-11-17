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
            '-map',
            '0:v:0',
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
        streamAudio: [
            '-map',
            '0:a:0',
            '-acodec',
            'libfdk_aac',
            '-profile:a',
            'aac_eld',
            '-flags',
            '+global_header',
            '-f',
            'null',
            '-ar',
            '24k',
            '-b:a',
            '${bitrate}k',
            '-bufsize:a',
            '${bitrate}k',
            '-ac',
            '1',
            '-payload_type',
            '110',
            '-ssrc',
            '${targetAudioSsrc}',
            '-f',
            'rtp',
            '-srtp_out_suite',
            'AES_CM_128_HMAC_SHA1_80',
            '-srtp_out_params',
            '${audiokey}',
            'srtp://${targetAddress}:${targetAudioPort}?rtcpport=${targetAudioPort}&localrtcpport=${targetAudioPort}&pkt_size=1378'
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

