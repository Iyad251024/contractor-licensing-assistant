export const documentStorage = {
  async put(bucket: R2Bucket, key: string, body: ArrayBuffer, contentType: string) {
    await bucket.put(key, body, { httpMetadata: { contentType } });
  },
  async get(bucket: R2Bucket, key: string) {
    return bucket.get(key);
  },
  async delete(bucket: R2Bucket, key: string) {
    await bucket.delete(key);
  },
};
