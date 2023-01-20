<template lang="">
  <v-app>
    <v-container fill-height fluid>
      <v-row align-content="center" justify="center">
        <v-col cols="4" align-self="center">
          <div class="text-container" id="text-container">
            <h1 class="black--text text-h1">Hey there!</h1>
            <div class="spacer"></div>
          </div>
          <v-btn text @click="scroll('text-container')">
            Scroll Into View
          </v-btn>
        </v-col>
        <v-col cols="3" align-self="center">
          <v-icon
            color="black"
            size="200"
            class="icon__intro waving-hand"
            x-large
            >fa-solid fa-hand</v-icon
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: "StartPage",
  data: function () {
    return {
      dialog: {
        intro: [
          `<p class="black--text text-subtitle-1 intro__subtitle">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur nihil alias ullam vitae, ipsa voluptas obcaecati
              eligendi. Eos numquam, nam facere pariatur esse asperiores iure
              quia quo perspiciatis rerum consequatur!
            </p>`,
          `<p class="black--text text-subtitle-1 intro__subtitle">Before we start I want to tell you about the funny gimmick I came up with to make myself feel special. For this you will need a functioning and connected camera.</p>`,
          `<p class="black--text text-subtitle-1 intro__subtitle">Do you have a camera connected?</p><v-btn>Yes, I have.</v-btn><v-btn>No, I haven't.</v-btn>`,
          `<p class="black--text text-subtitle-1 intro__subtitle">Great! Now make sure one of your hands is able to be detected by your camera.</p>`,
          `<p class="black--text text-subtitle-1 intro__subtitle">No worries, the entire website can be navigated just by mouse as well. (The gimmick is to navigate the website via your hands btw.)</p>`,
        ],
      },
      timer: function (miliseconds, action) {
        setTimeout(action, miliseconds);
      },
      addParagraph: function (elID, p, sec) {
        const el = document.getElementById(elID);
        const text = this.dialog.intro[p];

        this.timer(sec, () => {
          console.log(el);
          el.insertAdjacentHTML("beforeend", text);
          el.lastChild.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        });
      },
    };
  },
  created: function () {},
  mounted: function () {
    this.addParagraph("text-container", 0, 5000);
    this.addParagraph("text-container", 1, 10000);
    this.addParagraph("text-container", 2, 15000);
    this.addParagraph("text-container", 3, 20000);
  },
  methods: {
    test: function () {
      this.timer(5000, this.shout);
    },
    scroll(elID) {
      const el = document.getElementById(elID);
      el.lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
    },
    /** addParagraph: function (elID, p, sec) {
      const el = document.getElementById(elID);
      console.log(elID);
      console.log(el);
      const text = this.dialog.intro[p];
      console.log(text);
      console.log(this.dialog.intro);
      this.timer(sec, () => {
        console.log("addingPa");
        el.insertAdjacentHTML("beforeend", text);
        el.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    }, */
  },
};
</script>
<style scoped>
.icon__intro {
  font-size: 20rem !important;
}

.intro__subtitle {
  animation: fade-in 4s ease-in;
  padding-left: 7px;
}

.waving-hand {
  animation: wave ease-in-out 2s 0.6s infinite;
  transform-origin: 50% 100%;
}

.spacer {
  max-height: 20px;
  min-height: 20px;
}

.text-container {
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 0px;
  /* Remove scrollbar space */
  background: transparent;
  /* Optional: just make scrollbar invisible */
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(16deg);
  }

  20% {
    transform: rotate(-6deg);
  }

  30% {
    transform: rotate(16deg);
  }

  40% {
    transform: rotate(-4deg);
  }

  50% {
    transform: rotate(16deg);
  }

  60% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0%;
  }
  50% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}
</style>
