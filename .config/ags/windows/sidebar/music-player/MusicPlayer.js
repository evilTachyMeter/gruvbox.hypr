import {
  musicStatus,
  musicThumbnailUrl,
  musicArtist,
  musicTitle,
  musicPosition,
  musicLength,
  prev,
  toggle,
  next
} from '../../../shared/music.js'

function MusicMeta() {
  const Title = Widget.Label({
    className: 'title',
    label: musicTitle.bind(),
    maxWidthChars: 8,
    truncate: 'end',
    justification: 'center',
    hexpand: true
  })

  const Artist = Widget.Label({
    className: 'artist',
    label: musicArtist.bind(),
    maxWidthChars: 16,
    truncate: 'end',
    justification: 'center',
    hexpand: true
  })

  return Widget.Box({
    className: 'meta',
    vertical: true,
    children: [
      Title,
      Artist
    ]
  })
}

function Controls() {
  const PrevButton = Widget.Button({
    className: 'prev_button control',
    hpack: 'end',
    onPrimaryClick: () => prev(),
    child: Widget.Label('󰒮')
  })

  const PlayButton = Widget.Button({
    className: 'play_button control',
    hpack: 'center',
    onPrimaryClick: () => toggle(),
    child: Widget.Label().hook(musicStatus, (self) => {
      if (musicStatus.value === 'Stopped') self.label = '󰓛'
      if (musicStatus.value === 'Playing') self.label = '󰏤'
      if (musicStatus.value === 'Paused') self.label = '󰐊'
    })
  })

  const NextButton = Widget.Button({
    className: 'next_button control',
    hpack: 'start',
    onPrimaryClick: () => next(),
    child: Widget.Label('󰒭')
  })

  return Widget.CenterBox({
    className: 'controls',
    vpack: 'end',
    vexpand: true,
    spacing: 10,
    startWidget: PrevButton,
    centerWidget: PlayButton,
    endWidget: NextButton
  })
}

function Position() {
  const Progress = Widget.ProgressBar({
    className: 'progress',
    value: musicPosition.bind().transform(pos => musicPosition.value / musicLength.value)
  })

  return Widget.Box({
    className: 'position',
    vertical: true,
    children: [
      Progress
    ]
  })
}

export default function() {
  const Thumbnail = Widget.Box({
    className: 'thumbnail',
    css: musicThumbnailUrl.bind().transform(thumb => `background-image: url("${thumb}")`)
  })

  return Widget.Box({
    className: 'music_player',
    vexpand: false,
    spacing: 10,
    children: [
      Thumbnail,
      Widget.Box({
        className: 'right',
        vertical: true,
        children: [
          MusicMeta(),
          Controls(),
          Position()
        ]
      })
    ]
  })
}
