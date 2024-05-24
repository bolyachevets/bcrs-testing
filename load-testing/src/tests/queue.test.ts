import { group } from 'k6'
import { Options } from 'k6/options'

import { createRequestConfigWithTag } from '../helpers/request'
import { setSleep } from '../helpers/sleep'


import * as tokenAction from '../actions/token.action'
import * as namexApiAction from '../actions/namex-api.action'


export let options: Partial<Options> = {
    vus: 1, // 1 user looping for 30s
    duration: '2s',
    thresholds: {
        http_req_duration: ['avg<5000', 'p(95)<10000'], // 95% of requests must complete below 10000ms
    },
};


// The Setup Function is run once before the Load Test https://docs.k6.io/docs/test-life-cycle
export function setup () {
    let token: string  = tokenAction.get_token()
    return token
}

export default (_token: any) => {

    let httpParams = createRequestConfigWithTag(_token)
    group('Queue Testing', () => {
        namexApiAction.processNamerequest(httpParams)
    })

    setSleep()
}

// The Teardown Function is run once after the Load Test https://docs.k6.io/docs/test-life-cycle
export function teardown () {


}
