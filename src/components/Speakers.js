import shuffleArray from "../util/shuffleArray";

const SPEAKERS_STYLES = {
  speakerItem: "style-speakerItem",
  speakerImage: "style-speakerImage",
  speakerName: "style-speakerName",
};

export class Speakers {
  speakersList;
  currentRenderPage = 0;
  renderStep = 6;
  parentElement;
  loadMoreButtonEl;

  constructor(speakersData, parentElement, loadMoreButton) {
    this.parentElement = parentElement;
    this.loadMoreButtonEl = loadMoreButton;
    this.renderStep = window.innerWidth > 768 ? 8 : 6;

    this.speakersList = shuffleArray(
      speakersData.map((speaker) => new Speaker(speaker))
    );

    this.render();
  }

  render() {
    this.#nextSpeakerPage.forEach((speaker) => {
      const speakerEl = speaker.render();
      this.parentElement.appendChild(speakerEl);
    });
    this.currentRenderPage += this.renderStep;

    this.#updateLoadMoreButton();
  }

  get #nextSpeakerPage() {
    return this.speakersList.slice(
      this.currentRenderPage,
      this.currentRenderPage + this.renderStep
    );
  }

  #updateLoadMoreButton() {
    if (this.currentRenderPage < this.speakersList.length) {
      this.loadMoreButtonEl.classList.remove("hidden");

      this.loadMoreButtonEl.addEventListener(
        "click",
        () => {
          this.render();
        },
        { once: true }
      );
    } else {
      this.loadMoreButtonEl.classList.add("hidden");
    }
  }
}

class Speaker {
  name;
  image;
  constructor({ name, image }) {
    this.name = name;
    this.image = image;
  }

  render() {
    const speakerItem = document.createElement("li");
    speakerItem.classList.add(SPEAKERS_STYLES.speakerItem);

    const speakerImage = document.createElement("img");
    speakerImage.classList.add(SPEAKERS_STYLES.speakerImage);
    speakerImage.src = this.image;
    speakerImage.alt = this.name;
    speakerImage.width = "96";

    const speakerName = document.createElement("p");
    speakerName.classList.add(SPEAKERS_STYLES.speakerName);
    speakerName.innerText = this.name;

    speakerItem.appendChild(speakerImage);
    speakerItem.appendChild(speakerName);

    return speakerItem;
  }
}
