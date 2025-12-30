export function extractVideoID(url: string): string {
const regex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/;


    const match = url.match(regex)
    console.log(match)
    if (!match) {
        throw new Error("URL do youtube e invalida");
    }

    return match[1];
}