import { group, check, sleep } from "k6";
import http from 'k6/http';
// HTML Report Benc-uk
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js'

export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 20 },
        { duration: '20s', target: 0 },
    ],
        thresholds: {
        'http_req_duration{name:Homepage}': ['p(95)<500'],
        'http_req_duration{name:ProductPage}': ['p(95)<800'],
    }
};

//Grouping and Tags
export default function () {
    group('Homepage Flow', function (){
        let homeRes = http.get('https://demoblaze.com', {
            tags: { name: 'Homepage' },
        });

        check(homeRes, {
            'homepage loaded': (r) => r.status === 200,
        });
        sleep(2);
    });
    group('Productpage Flow',function(){
        let productRes = http.get('https://www.demoblaze.com/prod.html?idp_=1', {
            tags: { name: 'ProductPage' },
        });

        check(productRes, {
            'productpage loaded': (r) => r.status === 200,
        });
        sleep(2);
    });
}

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data),
  }
}