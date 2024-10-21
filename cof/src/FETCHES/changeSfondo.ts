interface jsonResIPhoto {
    next_page: string;
    page: number;
    per_page: number;
    photos: IPhotoArr[];
    total_results: number;
}

interface IPhotoArr {
    alt: string;
    avg_color: string;
    height: number;
    id: number;
    liked: boolean;
    photographer: string;
    photographer_id: number;
    photographer_url: string;
    url: string;
    width: number;
    src: source;
}

interface source {
    landscape: string;
    large: string;
    large2x: string;
    medium: string;
    original: string;
    portrait: string;
    small: string;
    tiny: string;
}

export const changeSfondoMessageBox = async (city: string): Promise<string | Error> => {
    try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${city}`, {
            method: "GET",
            headers: {
                Authorization: "7Ye7PHnNDdVmd43T5cthTwaF0I2AipmjtizxjFtVcXnzQIgCqJYlTLXP",
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            if (res.status > 400 && res.status < 500) {
                if (res.status === 429) {
                    throw new Error("Too many requests.");
                }

                throw new Error("errore lato client");
            }

            if (res.status > 500) {
                throw new Error("errore server.");
            }

            throw new Error("errore.");
        } else {
            const goodResponse: jsonResIPhoto = await res.json();
            console.log(goodResponse);
            const myPhoto = goodResponse.photos[Math.floor(Math.random() * goodResponse.photos.length)].src.large2x;
            console.log(myPhoto);
            return myPhoto;
        }
    } catch (err) {
        return new Error("problemino:" + err);
    }
};
