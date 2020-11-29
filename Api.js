class Lyricly {

    // #songId = '';
    // #title = '';
    // #image = '';
    // #duration = '';

    // getValues() {
    //     const values = {songId: this.#songId, title: this.#title, image: this.#image, duration: this.#duration};
    //     return values;
    // }


    // #setValues(data) {
    //     this.#songId = data.songId;
    //     this.#title = data.title;
    //     this.#image = data.image;
    //     this.#duration = data.duration;
    // }

    async fetchSpeech(speech) {
        return fetch(`https://lyricly.herokuapp.com/${speech}`)

        .then(response => response.json())
        .then(data => {
            // this.#setValues(data);
            return data;
        })
        .catch(err => console.log(err));
    }

    async deleteSong(songId) {
        // const songId = this.getValues().songId;
        if(!songId)
            return

        fetch(`https://lyricly.herokuapp.com/del/${songId}`)
        .then(response => {
            if (response.status === 204)
                console.log('Song Successfully Deleted');
        })
        
    }

}

export default Lyricly;