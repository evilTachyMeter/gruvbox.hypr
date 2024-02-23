const Mpris = await Service.import('mpris')

export const PLAYERS = ['spotify']
export const NO_MUSIC = `${App.configDir}/assets/no-music.png`

export const player = Variable()
export const musicStatus = Variable('Stopped')
export const musicThumbnail = Variable(NO_MUSIC)
export const musicThumbnailUrl = Variable(NO_MUSIC)
export const musicTitle = Variable('No Music')
export const musicArtist = Variable('Artist')
export const musicAlbum = Variable('Album')
export const musicVolume = Variable(0)

Mpris.connect('changed', () => {
  const spotifyPlayer = Mpris.players.find(player => PLAYERS.includes(player.name))

  if (!spotifyPlayer) {
    musicStatus.value = 'Stopped'
    musicThumbnail.value = NO_MUSIC
    musicThumbnailUrl.value = NO_MUSIC
    musicTitle.value = 'No Music'
    musicArtist.value = 'Artist'
    musicAlbum.value = 'Album'
    musicVolume.value = 0
  }

  spotifyPlayer?.connect('changed', () => {
    player.value = spotifyPlayer

    musicStatus.value = spotifyPlayer.playBackStatus
    musicThumbnail.value = spotifyPlayer.coverPath
    musicThumbnailUrl.value = spotifyPlayer.trackCoverUrl
    musicTitle.value = spotifyPlayer.trackTitle
    musicArtist.value = spotifyPlayer.trackArtists.join(', ') || 'Album'
    musicAlbum.value = spotifyPlayer.trackAlbum
    musicVolume.value = parseFloat(spotifyPlayer.volume)
  })
})

export function toggle() {
  if (musicStatus.value === 'Stopped') return

  player.value.playPause()
}

export function play() {
  if (musicStatus.value === 'Stopped') return

  player.value.play()
}

export function pause() {
  if (musicStatus.value === 'Stopped') return

  player.value.stop()
}

export function next() {
  if (musicStatus.value === 'Stopped') return

  player.value.next()
}

export function prev() {
  if (musicStatus.value === 'Stopped') return

  player.value.previous()
}

export function setVolume(volume) {
  Utils.exec(`playerctl volume ${volume}`)
}

export default {
  player,
  musicStatus,
  musicTitle,
  musicArtist,
  musicAlbum
}
