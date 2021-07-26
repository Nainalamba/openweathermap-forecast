var schema = {

       "type": "object",
       "properties": {
              "daily": {
                     "type": "array",
                            "items": [{
                                   "type": "object",
                                   "properties": {
                                          "dt": {
                                                 "type": "integer"
                                          },
                                          "temp": {
                                                 "type": "object",
                                                 "properties": {
                                                         "day": {
                                                               "type": "number"
                                                        }
                                                 },
                                                 "required": ["day"],
                                                 "additionalProperties": true
                                          }
                                   },
                                   "required": ["dt","temp"],
                                   "additionalItems": true
                            }
                     ]
              }
       },
       "required": ["daily"],
       "additionalProperties": true
}
exports.weatherSchema = schema