import type { AsyncDataRequestStatus } from '#app';

export default function (status: AsyncDataRequestStatus) {
  return status === 'pending';
}
