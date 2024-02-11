#!/bin/bash

special_open=`hyprctl monitors -j | jq ".[0].specialWorkspace.name" | grep "special"`
if [ ! -z $special_open ]; then
  hyprctl dispatch togglespecialworkspace # Open
else
  # Close
  hyprctl dispatch togglespecialworkspace
  bash ~/.config/ags/shared/scripts/applauncher.sh close
fi
