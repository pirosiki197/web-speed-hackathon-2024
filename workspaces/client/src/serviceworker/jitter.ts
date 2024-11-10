export async function jitter(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
}
