const request= require('request')

const forrecast = (_latitude,_longitude,_callback) => {

const url = 'http://api.weatherstack.com/current?access_key=4a3e0f0fb9ddff48bb54ad79f0e32196&query='+ _latitude +','+ _longitude+'&units=f'
 
request ({url, json: true},(error, {body })=> {
   if (error) 
   {
        _callback('Unable to connect service', undefined)
   }else if (body.eror) 
   {
          _callback('Unable to find location', undefined)
   }else 
   {
            _callback(undefined,body.current.weather_descriptions[0] + " .It is current  " + body.current.temperature + " degree " )
   }
 })
}

module.exports = forrecast



