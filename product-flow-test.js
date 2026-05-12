import http from 'k6/http';
import { check, sleep } from 'k6'

export const options = {
    stages: [
        {duration: '30s', target: 10},
        {duration: '1m', target: 20},
        {duration: '20s', target: 0},
    ]
};

export default function (){
    // Homepage
    let homeRes = http.get('https://demoblaze.com');

    check(homeRes,{
        'homepage loaded': (r) => r.status === 200,
    })

    sleep(2)

    // Product Detail
    let productRes = http.get('https://www.demoblaze.com/prod.html?idp_=1');

    check(productRes,{
        'product page loaded': (r) => r.status === 200,
    });

    sleep(2);
}