#!/usr/bin/env bash

download()
{
    while read line ; do
        IFS='**' read -ra ADDR <<< "$line"
        url=${ADDR[0]}
        name="$2/${ADDR[2]}.mp4"
        if [ ! -f "$name" ] && [ $url != 'null' ]
        then
            youtube-dl -o "$name" $url
            #echo -o "$name" $url
        fi
    done <<< "`cat $1`"
}

find . -name '*.part' -delete
find . -name '*.ytdl' -delete

for file in list/*; do
  video=$(echo $file | sed 's/list/video/g');
  mkdir -p "$video"
  download "$file" "$video"
done





