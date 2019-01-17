const api = "https://api.foursquare.com/v2/venues/search"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json'
}

export const get = (restaurant, latitude, longitude) =>
  fetch(`${api}?ll=${latitude},${longitude}&query=${restaurant}&radius=50&client_id=HFXTUWWZKWBKYSVAPLVPB25TMM1WTWYNTRGTEGNPCCF2ZUBJ&client_secret=CPPLVBNGIDDAWMFB5YQPHWZWAXC5GV3CITCWBYN4N4UC13AK
&v=20190115`, { headers })
    .then(res => res.json())