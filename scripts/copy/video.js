/* Video cluster copy. Same blueprint and rules as pdf.js.
   Specifics (CRF values, frame rates, limits) come from the tool code in tools.js, so keep them in step. */
'use strict';
module.exports = {
  'compress-video': {
    title: 'Compress Video Online, Reduce Size',
    meta: 'Shrink video files in your browser with H.264 compression. Choose the quality and resolution. Free and private, with no upload and no sign-up.',
    answer: 'Compress Video makes a video file smaller by re-encoding it with H.264 video and AAC audio. You choose a quality level and an optional maximum resolution, and the tool never enlarges a video. It runs on your own device, so the video never leaves it.',
    steps: ['Add a video (MP4, MOV, MKV, WebM, AVI and more).', 'Pick the compression level and, if you want, a maximum resolution.', 'Click Compress video, then download the smaller MP4.'],
    use: ['A chat app or portal rejects your video as too large.', 'You want to email a clip without hitting the attachment limit.', 'You need to free storage space and keep a watchable copy.'],
    tips: [
      'Choose Strong for the smallest file, Balanced for everyday sharing and Light when quality matters most. The levels use H.264 CRF values of 32, 28 and 24, and a higher number gives a smaller file.',
      'Lower the maximum resolution for the biggest saving. The tool offers 1080p, 720p and 480p caps, and it never scales a smaller video up.',
      'Trim the parts you do not need first with <a href="/trim-video">Trim Video</a>, so you do not encode footage that you will cut.',
      'Keep the tab open until the tool finishes. Long, high-resolution videos take minutes, and the result is an MP4 that plays on almost every phone and computer.'
    ],
    limits: ['The tool refuses files over about 700 MB, because browsers have limited memory.', 'The first run downloads a video engine of about 30 MB.', 'The tool returns your original when it cannot make a smaller file.'],
    faq: [
      ['How long does it take?', 'It runs on your device, so the time depends on the video length and your computer. Short clips take seconds, and long high-resolution videos take several minutes.'],
      ['Is there a size limit?', 'Yes. The tool refuses files over about 700 MB, because browsers have limited memory.'],
      ['What if my video is already small?', 'The tool returns your original unchanged and says so, so you never get a bigger file.'],
      ['What do the quality levels do?', 'Light uses H.264 CRF 24, Balanced uses 28 and Strong uses 32. A higher CRF gives a smaller file with more visible loss. The tool saves the audio as AAC at 128 kbps.']
    ],
    next: [['trim-video', 'Cut unwanted parts before you compress.'], ['resize-video', 'Lower the resolution for a smaller file.'], ['convert-video', 'Change the format if a device will not play the file.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'trim-video': {
    title: 'Trim Video Online, Cut Clips Free',
    meta: 'Cut a video to the part you need by setting start and end times. Choose fast mode or exact mode. Free and private, in your browser.',
    answer: 'Trim Video cuts a video to the start and end times you set. Fast mode copies the video without re-encoding and keeps your original format, but it cuts at the nearest keyframe. Exact mode re-encodes the clip to an MP4 for frame-accurate cuts.',
    steps: ['Add a video.', 'Type the start and end time, such as 0:05 and 0:30, and choose Fast or Exact.', 'Click Trim video, then download the clip.'],
    use: ['You want to share only the best 30 seconds of a recording.', 'You need to cut an intro from a screen recording.', 'You want a short clip before you compress or convert it.'],
    tips: [
      'Use Fast for a quick cut with no quality loss. Use Exact when the cut must land on a precise moment, such as the start of a word.',
      'To remove only an intro, set the start time and leave the end blank. The clip then runs to the end of the video.',
      'Type time as seconds (90), minutes and seconds (1:30), or hours, minutes and seconds (0:01:30).',
      'Send the clip through <a href="/compress-video">Compress Video</a> when you need a smaller file after trimming.'
    ],
    limits: ['Fast mode can cut a moment early or late, because it cuts at keyframes.', 'The tool stops with a message when the end time is before the start time, or when the start time passes the end of the video.', 'Exact mode re-encodes the clip, so it takes longer and always saves an MP4.'],
    faq: [
      ['What is the difference between Fast and Exact?', 'Fast copies the existing video data, so it works quickly with no quality loss, but the cut can sit a moment off. Exact re-encodes the clip with H.264, so the cut lands precisely.'],
      ['Which time formats can I use?', 'Use seconds (90), minutes and seconds (1:30), or hours, minutes and seconds (0:01:30).'],
      ['Can I leave the end time blank?', 'Yes. The clip then runs from your start time to the end of the video.'],
      ['Which formats can I trim, and which format do I get?', 'You can trim MP4, MOV, MKV, WebM and AVI files. Fast mode keeps your original format, and Exact mode saves an MP4.']
    ],
    next: [['compress-video', 'Shrink the trimmed clip.'], ['merge-videos', 'Join several trimmed clips.'], ['extract-audio', 'Save the sound of the clip.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4 or the original format']
  },
  'convert-video': {
    title: 'Convert Video Online, MP4 WebM MOV',
    meta: 'Convert video between MP4, WebM, MOV, MKV and AVI in your browser. Free and private, with no upload and no sign-up.',
    answer: 'Convert Video changes a video file into MP4, WebM, MOV, MKV or AVI. The tool re-encodes the picture and sound on your device, so the file never leaves it. MP4 with H.264 and AAC plays on nearly every phone, computer and TV.',
    steps: ['Add a video.', 'Choose the format to convert to.', 'Click Convert video, then download the file.'],
    use: ['Your TV or phone will not play an MKV or AVI file.', 'You need a WebM video for your website.', 'An editing app wants MOV instead of MP4.'],
    tips: [
      'Choose MP4 for sharing, WebM for websites and MOV for Apple editing software.',
      'Convert an MKV or AVI file to MP4 when a phone or TV will not play it.',
      'Remember that conversion aims for quality, not for a file size. Use <a href="/compress-video">Compress Video</a> afterwards for a smaller file.',
      'Pick WebM for websites. The tool saves WebM with VP8 video and Vorbis audio, which current browsers play.'
    ],
    limits: ['The tool re-encodes MP4, MOV and MKV with H.264 at CRF 23, so a small loss is possible.', 'The tool refuses files over about 700 MB.', 'AVI output uses older MPEG-4 video with MP3 audio, so the file is usually larger than an MP4.'],
    faq: [
      ['Which format should I pick?', 'MP4 works almost everywhere. WebM suits websites, MOV suits Apple software, and MKV and AVI suit specific players.'],
      ['Will the quality change?', 'The tool re-encodes the video at good quality (H.264 CRF 23 for MP4, MOV and MKV), so you may lose a little detail.'],
      ['Why is conversion slow?', 'It runs on your device, so long or high-resolution videos take longer. Keep the tab open until the tool finishes.'],
      ['Can I convert a video to MP3?', 'Not here. Use Extract Audio from Video to save the sound as MP3, M4A or WAV.']
    ],
    next: [['compress-video', 'Shrink the converted file.'], ['extract-audio', 'Save only the sound.'], ['trim-video', 'Cut the clip to the part you need.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4, WebM, MOV, MKV, AVI']
  },
  'merge-videos': {
    title: 'Merge Videos Online, Join Clips Free',
    meta: 'Join several video clips into one MP4 in your browser. Reorder the clips and choose the output size. Free and private, with no upload.',
    answer: 'Merge Videos joins two or more clips into one MP4, in the order you choose. The tool scales every clip to one output size (480p, 720p or 1080p) at 30 frames per second, so videos of different sizes play smoothly together.',
    steps: ['Add at least two video clips.', 'Use the arrows to set the order and choose the output size.', 'Click Merge videos, then download merged.mp4.'],
    use: ['You want to join several phone clips into one video.', 'You need to add an intro or outro clip.', 'You want one file to upload instead of many.'],
    tips: [
      'Set the output size to match your best clip. The tool scales smaller clips to fit, with black bars where needed.',
      'Clips with the same orientation look best. Mixing portrait and landscape adds black bars, because the tool keeps the proportions of every clip.',
      'Check the order with the arrows before you merge. The clips play from top to bottom.',
      'Keep the total under about 700 MB. Compress large clips first with <a href="/compress-video">Compress Video</a>.'
    ],
    limits: ['The merged video has no sound when any clip has no audio, and the tool tells you.', 'The combined size of all clips must stay under about 700 MB.', 'The tool saves one MP4 at 30 frames per second.'],
    faq: [
      ['What happens when my clips have different sizes?', 'The tool scales each clip to fit the output size you choose and adds black bars where the proportions differ. Every clip keeps its own proportions.'],
      ['What if one clip has no audio?', 'The merged video has no audio, and the tool tells you. Add sound to every clip, or merge only clips that have none.'],
      ['Is there a limit on clips?', 'The tool sets no fixed limit on the number of clips, but the combined size must stay under about 700 MB.'],
      ['Can I change the clip order?', 'Yes. Use the arrows next to each clip before you merge.']
    ],
    next: [['trim-video', 'Cut each clip to the part you need first.'], ['compress-video', 'Shrink the merged video.'], ['resize-video', 'Change the resolution of the result.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'extract-audio': {
    title: 'Extract Audio from Video, MP3 M4A WAV',
    meta: 'Pull the audio track out of any video as MP3, M4A or WAV in your browser. Free and private, with no upload and no sign-up.',
    answer: 'Extract Audio from Video saves the sound of a video as an MP3, M4A (AAC) or WAV file. MP3 uses high-quality variable bitrate, M4A uses 192 kbps AAC, and WAV stays uncompressed. It runs in your browser, so the video stays on your device.',
    steps: ['Add a video that has sound.', 'Choose MP3, M4A or WAV.', 'Click Extract audio, then download the file.'],
    use: ['You want the audio of a lecture or interview.', 'You need a sound clip from a video that you own.', 'You want to listen on a device that plays audio only.'],
    tips: [
      'Choose MP3 for sharing, M4A for good quality in a smaller file, and WAV for editing.',
      'To keep only part of the sound, cut the video first with <a href="/trim-video">Trim Video</a>.',
      'WAV files stay uncompressed (16-bit) and large, so a long video makes a big file.',
      'When a message says the video has no audio, the original file has no sound track.'
    ],
    limits: ['The tool saves MP3 at high quality (VBR level 2) and M4A at 192 kbps.', 'The tool refuses files over about 700 MB.', 'The tool finds no sound in videos without an audio track.'],
    faq: [
      ['Which audio format should I choose?', 'MP3 is the most compatible. M4A gives good quality in smaller files. WAV keeps the audio uncompressed and large.'],
      ['What if the video has no audio?', 'The tool tells you that the video has no audio track.'],
      ['Does the tool reduce the audio quality?', 'MP3 and M4A compress with a small loss at high quality. WAV stores the sound as uncompressed 16-bit audio, so choose WAV when you plan to edit.'],
      ['Which video formats work?', 'MP4, MOV, MKV, WebM and AVI files work.']
    ],
    next: [['trim-video', 'Cut the video to the part you want first.'], ['convert-video', 'Convert the whole video to another format.'], ['mute-video', 'Remove the sound instead.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP3, M4A, WAV']
  },
  'mute-video': {
    title: 'Remove Audio from Video Online, Free',
    meta: 'Remove the sound from a video without re-encoding it, in your browser. Fast, free and private, with no upload.',
    answer: 'Remove Audio from Video deletes the sound track from a video and keeps the picture exactly as it is. The tool copies the video without re-encoding it, so it works fast, loses no quality and keeps your original format.',
    steps: ['Add a video.', 'Click Remove audio.', 'Download the silent video.'],
    use: ['A screen recording contains background noise.', 'You want to add your own music later.', 'You need a silent clip for a presentation or website.'],
    tips: [
      'Remove noise or copyrighted music from a screen recording before you share it.',
      'The tool copies the video stream without re-encoding, so it finishes fast and keeps the picture intact.',
      'The result keeps the format of your original and adds -muted to the file name. Your original file stays unchanged.',
      'Add your own music or voiceover afterwards in your video editor.'
    ],
    limits: ['The tool keeps the original format and does not convert it.', 'The tool stops with a message when the video already has no audio.', 'The tool refuses files over about 700 MB.'],
    faq: [
      ['Does removing audio change the video quality?', 'No. The tool copies the video stream unchanged, so the picture stays exactly as it was.'],
      ['Can I keep my original with the sound?', 'Yes. The tool leaves your original file unchanged and gives you a new silent copy.'],
      ['What if my video has no audio already?', 'The tool tells you that it already has no audio.'],
      ['Which formats work?', 'MP4, MOV, MKV, WebM and AVI files work, and the result keeps the same format.']
    ],
    next: [['extract-audio', 'Save the sound as a separate file.'], ['trim-video', 'Cut the silent clip to length.'], ['compress-video', 'Shrink the silent clip.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'Same format']
  },
  'video-to-gif': {
    title: 'Video to GIF Converter, Free Online',
    meta: 'Turn part of a video into an animated GIF in your browser. Choose the start, length, frame rate and width. Free and private.',
    answer: 'Video to GIF converts a clip of up to 20 seconds into an animated GIF that loops forever. You choose the start, length, frame rate (8, 12 or 18 fps) and width (320, 480 or 640 px). The tool builds a custom colour palette for good results.',
    steps: ['Add a video.', 'Set the start time, the length (up to 20 seconds), the frame rate and the width.', 'Click Create GIF, then download it.'],
    use: ['You want a short reaction or demo clip for chat.', 'You need a looping animation for an email or forum.', 'You want a silent preview of a longer video.'],
    tips: [
      'Start at 8 fps and about 320 px wide. Raise them only when the file stays small enough.',
      'Keep the clip as short as you can. GIFs grow large, and the limit here is 20 seconds.',
      'Set the start time to the exact moment you want, so you do not waste seconds on extra footage.',
      'On a website, an MP4 usually weighs far less than a GIF, so keep GIFs for chat and email.'
    ],
    limits: ['The tool limits clips to 20 seconds.', 'GIF files grow large fast, so long or wide clips make heavy files.', 'GIF files carry no sound, so the result is silent.'],
    faq: [
      ['Why is my GIF so large?', 'GIFs use an inefficient format. Use a shorter clip, a lower frame rate (8 fps) or a smaller width (320 px).'],
      ['What is the maximum length?', 'The maximum length is 20 seconds. The default length is 5 seconds, and the tool rounds anything below half a second up to 0.5 seconds.'],
      ['Does the GIF carry a watermark?', 'No. The tool adds no watermark to your GIF.'],
      ['Which settings should I start with?', 'Start with 12 fps and 480 px for balanced results. Choose 8 fps and 320 px for a small file, or 18 fps and 640 px for the smoothest picture.']
    ],
    next: [['trim-video', 'Find the exact moment before you convert.'], ['resize-video', 'Reduce the size of the source video.'], ['gif-to-video', 'Turn a heavy GIF back into a small MP4.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'GIF']
  },
  'gif-to-video': {
    title: 'GIF to MP4 Converter, Free Online',
    meta: 'Convert an animated GIF into a small MP4 video in your browser. Free and private, with no upload and no sign-up.',
    answer: 'GIF to Video turns an animated GIF into an MP4 video with H.264. The MP4 is usually much smaller than the GIF and plays smoothly on phones and websites. The tool runs in your browser, so the GIF stays on your device.',
    steps: ['Add a GIF.', 'Click Convert to MP4.', 'Download the MP4.'],
    use: ['A GIF loads slowly on your website.', 'You want a smaller file for social media or email.', 'You need smoother playback than a GIF gives.'],
    tips: [
      'Convert a GIF when it loads slowly or weighs too much. The MP4 is usually many times smaller.',
      'The MP4 is a normal video, so turn on looping in your player or in your website embed.',
      'Expect tiny colour shifts, because MP4 uses a different colour format.',
      'This tool takes GIF files only. To go the other way, use <a href="/video-to-gif">Video to GIF</a>.'
    ],
    limits: ['The tool accepts GIF files only.', 'The MP4 does not loop by itself. Your player or embed controls looping.', 'The tool trims an odd width or height by one pixel, because MP4 needs even sizes.'],
    faq: [
      ['Why convert a GIF to MP4?', 'MP4 files are usually many times smaller than the same animation as a GIF, and they play more smoothly.'],
      ['Does the MP4 loop?', 'The file is a normal video, so it plays once. Most players and websites can loop it, and you can switch looping on in your embed.'],
      ['Will the colours change?', 'Slightly. MP4 uses a different colour format, but the results look close.'],
      ['Can I turn the MP4 back into a GIF?', 'Yes. Use Video to GIF, and keep the clip short to keep the GIF small.']
    ],
    next: [['video-to-gif', 'Make a GIF from a video.'], ['compress-video', 'Shrink the MP4 further.'], ['resize-video', 'Lower the resolution of the MP4.']],
    io: ['GIF', 'MP4']
  },
  'rotate-video': {
    title: 'Rotate Video Online, Free',
    meta: 'Rotate a video by 90 degrees either way, or by 180 degrees, in your browser. Free and private, with no upload and no sign-up.',
    answer: 'Rotate Video turns a video 90 degrees clockwise, 90 degrees counter-clockwise or 180 degrees, and saves the result as a new MP4. It fixes clips that you filmed sideways or upside down, and it keeps the audio.',
    steps: ['Add a video.', 'Choose the rotation.', 'Click Rotate video, then download the MP4.'],
    use: ['You filmed a clip sideways by mistake.', 'A phone video plays upside down.', 'You need the right orientation before you edit or share.'],
    tips: [
      'Use 90 degrees for a sideways clip and 180 degrees for an upside-down one.',
      'Rotation redraws every frame, so it takes longer than a simple copy, especially for long videos.',
      'For a mirror image instead of a turn, use <a href="/flip-video">Flip Video</a>.',
      'The tool keeps the audio, so you do not need to add it back.'
    ],
    limits: ['The tool re-encodes the video, so it takes longer than a simple copy.', 'The tool rotates by 90 degrees either way, or by 180 degrees.', 'The tool refuses files over about 700 MB.'],
    faq: [
      ['Does rotating re-encode the video?', 'Yes. The tool must redraw every frame, so it saves a new MP4 with H.264 video at CRF 23 and keeps the audio as AAC.'],
      ['Can I flip the video instead?', 'Yes. Use the Flip Video tool for mirroring.'],
      ['Does the tool keep the audio?', 'Yes. The tool keeps the audio, and it also handles videos that have none.'],
      ['Which formats work?', 'MP4, MOV, MKV, WebM and AVI files work, and the tool saves an MP4.']
    ],
    next: [['flip-video', 'Mirror the clip instead.'], ['resize-video', 'Lower the resolution after you rotate.'], ['compress-video', 'Shrink the rotated clip.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'resize-video': {
    title: 'Resize Video Online, 1080p 720p 480p',
    meta: 'Change a video to 1080p, 720p, 480p, 360p or 240p in your browser. Free and private, with no upload and no sign-up.',
    answer: 'Resize Video changes the height of a video to 1080p, 720p, 480p, 360p or 240p and sets the width automatically to keep the proportions. The tool re-encodes with H.264 and saves an MP4 that suits web playback.',
    steps: ['Add a video.', 'Choose the target height.', 'Click Resize video, then download the MP4.'],
    use: ['A site or app limits the video resolution.', 'You want a smaller file for messaging apps.', 'You need a lower resolution for a slow connection.'],
    tips: [
      'Pick 720p for messaging apps, 1080p for general use and 480p when you need a small file.',
      'Scale down rather than up. A bigger video does not gain any detail.',
      'Fewer pixels also make a smaller file. For more control, add <a href="/compress-video">Compress Video</a>.',
      'The tool sets the width for you, so you never calculate the ratio.'
    ],
    limits: ['The tool changes the height only and sets the width automatically.', 'The tool can scale a video up, but it cannot add detail.', 'The tool refuses files over about 700 MB.'],
    faq: [
      ['Does the aspect ratio change?', 'No. The tool sets the width automatically to keep the original proportions.'],
      ['Can it make a video bigger?', 'Yes, it can scale a video up, but it cannot add detail. Use it mainly to scale down.'],
      ['Does resizing make the file smaller?', 'Usually yes, because fewer pixels need less data. The tool also re-encodes the video at H.264 CRF 23.'],
      ['Which resolution should I choose?', 'Choose 720p for messaging apps, 1080p for general use, 480p for small files, and 360p or 240p for slow connections.']
    ],
    next: [['compress-video', 'Shrink the file further.'], ['trim-video', 'Cut the clip to length.'], ['convert-video', 'Change the format.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'video-speed': {
    title: 'Change Video Speed Online, Free',
    meta: 'Speed up or slow down a video from 0.5x to 4x with the audio in sync, in your browser. Free and private, with no upload.',
    answer: 'Change Video Speed makes a video play faster (1.5x, 2x, 3x or 4x) or slower (0.75x or 0.5x). The tool keeps the audio in step with the picture. It runs in your browser and saves an MP4.',
    steps: ['Add a video.', 'Choose a speed.', 'Click Change speed, then download the MP4.'],
    use: ['You want to skim a long tutorial or recording.', 'You want a slow-motion look at one moment.', 'You need to fit a clip into a shorter time slot.'],
    tips: [
      'Use 2x or 3x to get through a long tutorial quickly, and 0.5x to study a moment in slow motion.',
      'The audio speeds up or slows down with the picture, and the pitch stays natural.',
      'A faster video is shorter, so the file usually shrinks too.',
      'Choose from the listed speeds only: 0.5x, 0.75x, 1.5x, 2x, 3x and 4x.'
    ],
    limits: ['The tool offers six fixed speeds.', 'Videos without audio produce a silent result.', 'The tool refuses files over about 700 MB.'],
    faq: [
      ['Does the audio pitch change?', 'No. The tool changes the audio tempo, not the pitch. For 3x and 4x it chains two tempo filters, because one filter reaches only 2x.'],
      ['Which speeds can I choose?', 'You can choose 0.5x, 0.75x, 1.5x, 2x, 3x or 4x.'],
      ['What if my video has no audio?', 'The tool processes only the picture, and the result has no sound.'],
      ['Which format does the tool save?', 'It saves an MP4 with H.264 video and AAC audio.']
    ],
    next: [['trim-video', 'Cut the clip to the part you need.'], ['compress-video', 'Shrink the result.'], ['extract-audio', 'Save the sped-up sound.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'add-subtitles': {
    title: 'Add Subtitles to Video Online, SRT VTT',
    meta: 'Add an SRT or VTT subtitle file to a video as a selectable subtitle track, in your browser. Free and private, with no upload.',
    answer: 'Add Subtitles combines a video with an .srt or .vtt subtitle file and saves an MP4 with a selectable subtitle track. Viewers can switch the subtitles on or off, because the tool does not burn the text into the picture.',
    steps: ['Add one video file and one .srt or .vtt subtitle file.', 'Click Add subtitles.', 'Download the MP4 and turn the subtitles on in your player.'],
    use: ['You want viewers to switch captions on or off.', 'You need captions on a video for accessibility.', 'You have an .srt file and want it inside the video.'],
    tips: [
      'Remember that the subtitles form a separate track. Viewers switch them on in the player.',
      'Some social sites ignore soft subtitle tracks. When a site lets you upload an .srt file, upload it there instead.',
      'MP4, MOV and M4V videos stay unchanged, so adding subtitles to them works fast.',
      'Check that the timings in your subtitle file match this version of the video, especially after trimming.'
    ],
    limits: ['The tool adds a soft subtitle track (mov_text). It does not burn text into the picture.', 'The tool accepts SRT and VTT files only.', 'The tool adds one subtitle file to one video at a time.'],
    faq: [
      ['Does the tool burn the subtitles into the video?', 'No. It adds them as a separate track, so viewers can switch them on or off. Some players and social sites ignore soft subtitle tracks.'],
      ['Which subtitle formats work?', 'SRT and VTT files work.'],
      ['Which videos work best?', 'The tool copies MP4, MOV and M4V videos without re-encoding. It converts other formats to MP4 with H.264, so those files take longer.'],
      ['Can I add several languages?', 'Not yet. The tool adds one subtitle file to one video.']
    ],
    next: [['trim-video', 'Trim the video before you add subtitles.'], ['compress-video', 'Shrink the finished video.'], ['convert-video', 'Change the video format first.']],
    io: ['MP4, MOV and others + SRT or VTT', 'MP4']
  },
  'flip-video': {
    title: 'Flip Video Online, Mirror Horizontally',
    meta: 'Flip a video horizontally (mirror) or vertically in your browser. Free and private, with no upload and no sign-up.',
    answer: 'Flip Video mirrors a video left to right, or turns it upside down, and saves the result as an MP4. It runs in your browser, so the video stays on your device, and it keeps the audio.',
    steps: ['Add a video.', 'Choose a horizontal or vertical flip.', 'Click Flip video, then download the MP4.'],
    use: ['A front-camera video shows reversed text.', 'You want a mirrored version of a clip.', 'A video from your phone plays upside down.'],
    tips: [
      'Flip horizontally to correct reversed text in a mirrored selfie video.',
      'Use a vertical flip for an upside-down clip, and <a href="/rotate-video">Rotate Video</a> for a sideways one.',
      'Flipping redraws every frame, so long clips take a while on your device.',
      'The tool keeps the audio as it is.'
    ],
    limits: ['The tool re-encodes the video, which takes time on long clips.', 'The tool refuses files over about 700 MB.', 'The tool saves the result as an MP4 file.'],
    faq: [
      ['What is the difference between flip and rotate?', 'Flip makes a mirror image. Rotate turns the video without mirroring it.'],
      ['Does the tool keep the audio?', 'Yes. The tool keeps the audio as it is.'],
      ['Does flipping re-encode the video?', 'Yes. The tool redraws every frame with H.264 at CRF 23, so you may lose a little detail.'],
      ['Which flips can I choose?', 'You can flip horizontally or vertically.']
    ],
    next: [['rotate-video', 'Turn a sideways clip instead.'], ['resize-video', 'Lower the resolution.'], ['compress-video', 'Shrink the flipped clip.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  }
};
