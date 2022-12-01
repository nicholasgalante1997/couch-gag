import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { log, Metric, MetricType } from '@nickgdev/couch-gag-common-lib';
import { emit } from './service';

export async function middleware(request: NextRequest) {
  // grab access to the next response (this needs to be returned)
  const response = NextResponse.next();

  // // denote time of operation
  log('info', 'Couch-Gag#Middleware - invoked at ' + new Date().toISOString());

  // // denote path request
  log('info', 'Requested path: ' + request.nextUrl.pathname);

  // determine environment
  const isDevelopment =
    typeof process.env.NODE_ENV !== 'undefined' &&
    process.env.NODE_ENV === 'development';
  const stage = isDevelopment ? 'local' : 'production';

  // log stage
  log('info', 'in stage ' + stage);

  // pipe metrics if in production
  if (stage === 'production') {
    const metric = new Metric(
      MetricType.PAGE_VIEW,
      'couch-gag-website#next-server-middleware',
      'page-pathname-(' + request.nextUrl.pathname + ')',
      1
    );
    await emit(metric);
  }

  // proxy the request to be handled by NextHandler
  return response;
}

export const config = {
  matcher: ['/', '/ab', '/a', '/s/one', '/r', '/t']
};
