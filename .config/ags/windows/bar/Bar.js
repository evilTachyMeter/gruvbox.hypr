import Gdk from 'gi://Gdk'
import { SystemControlsMenu } from './controls/SystemControls.js'

const Hyprland = await Service.import('hyprland')

function Divider() {
  return Widget.Box({
    className: 'divider'
  })
}

function StartSection() {
  const SideBarButton = Widget.Button({
    className: 'sidebar_button',
    cursor: 'pointer',
    child: Widget.Box({
      css: `background-image: url("/home/${Utils.exec('whoami')}/.face.icon")`
    }),
    onPrimaryClick: () => Utils.exec(`bash -c "${App.configDir}/shared/scripts/sidebar.sh toggle"`)
  })

  const SearchButton = Widget.Button({
    className: 'search_button',
    cursor: 'pointer',
    child: Widget.Label(''),
    onPrimaryClick: () => Utils.exec(`bash -c "${App.configDir}/shared/scripts/shown_sidebar.sh applauncher"`)
  })

  const WallpaperButton = Widget.Button({
    className: 'wallpaper_button',
    cursor: 'pointer',
    child: Widget.Label('󰸉')
  })

  return Widget.Box({
    className: 'start',
    vpack: 'start',
    vertical: true,
    spacing: 4,
    children: [
      SideBarButton,
      Divider(),
      SearchButton,
      WallpaperButton
    ]
  })
}

function CenterSection() {
  const WorkspaceIndicator = Widget.Box({
    className: 'workspace_indicator',
    vertical: true,
    spacing: 4,
    children: Array.from({ length: 5 }).map((_, i) =>
      Widget.Button({
        className: 'workspace',
        hpack: 'center',
        cursor: 'pointer',
        onPrimaryClick: () => Hyprland.message(`dispatch workspace ${i + 1}`)
      }).hook(Hyprland.active.workspace, (self) =>
        self.toggleClassName('active', Hyprland.active.workspace.id === i + 1)
      )
    )
  })

  return Widget.Box({
    className: 'center',
    vpack: 'center',
    vertical: true,
    children: [
      WorkspaceIndicator
    ]
  })
}

function EndSection() {
  const AudioControlButton = Widget.Button({
    className: 'audio_control_button',
    child: Widget.Label('󰋎')
  })

  const SystemControlButton = Widget.Button({
    className: 'system_control_button',
    onPrimaryClick: (self) => SystemControlsMenu.popup_at_widget(self, Gdk.Gravity.EAST, Gdk.Gravity.WEST, null),
    child: Widget.Label('')
  })

  const ScreenShotButton = Widget.Button({
    className: 'screenshot_button',
    child: Widget.Label('󰄄')
  })

  const TimeIndicator = Widget.Button({
    className: 'time_indicator',
    hpack: 'center',
    child: Widget.Label().poll(1000, (self) =>
      self.label = Utils.exec(`date +'%H\n%M'`)
    )
  })

  return Widget.Box({
    className: 'end',
    vpack: 'end',
    vertical: true,
    spacing: 4,
    children: [
      Widget.Box({
        className: 'controls',
        hpack: 'center',
        vertical: true,
        children: [
          AudioControlButton,
          SystemControlButton,
          ScreenShotButton
        ]
      }),
      TimeIndicator
    ]
  })
}

function Bar() {
  return Widget.Box({
    className: 'bar',
    child: Widget.CenterBox({
      className: 'sections',
      vertical: true,
      startWidget: StartSection(),
      centerWidget: CenterSection(),
      endWidget: EndSection()
    })
  })
}

export default Widget.Window({
  name: 'bar',
  layer: 'top',
  exclusivity: 'exclusive',
  anchor: ['left', 'top', 'bottom'],
  child: Bar()
})