import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';

export default function () {

  const url = new URL('https://perf.dbids.cms.gov/testLogin/');
  url.searchParams.append('userId', 'RAMA');
  //url.searchParams.append('uid', 'RAMA');
  //url.searchParams.append('multiple', ['foo', 'bar']);

  const res = http.get(url.toString());
  // https://k6.io?utm_medium=organic&utm_source=test&multiple=foo%2Cbar
}
