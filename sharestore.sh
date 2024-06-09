#!/bin/bash

##
# edit the index-xxxx.js Bloom file to add the necessary command to share the
# redux store to window.store.
# usage: ./sharestore.sh <path to index-xxxxxx.js file>
# v0.1 (02/06/2024)
# v0.2 (06/07/2024) - for Bloom 2.11.0

# for Bloom 2.10.0
# perl -i.bkp -pe 's/(\(\{reducer:[^,]+,middleware:.*?);return\s([a-zA-z]+)/${1};window.store=$2;return $2/' $1

# for Bloom 2.11.0
perl -i.bak -pe 's/;([^\.]+\.useEffect\(\(\)=>{[^\(]+\(\),[^\(]+\(\),[^\(]+\(([^(]+)\)})/$1,window.store=$2,console.log("Exposing store:",$2)/' $1
