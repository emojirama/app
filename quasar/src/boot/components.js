import BasePage from "components/ui/BasePage.vue";
import DarkMode from "components/ui/DarkMode.vue";
import LeftMenuLink from "components/LeftMenuLink.vue";
import MainHeader from "layouts/primary/MainHeader.vue";
import PageHeader from "components/ui/PageHeader.vue";
import PageSubHeader from "components/ui/PageSubHeader.vue";
import PageText from "components/ui/PageText.vue";
import BaseBtn from "components/ui/BaseBtn.vue";
import BaseCard from "components/ui/BaseCard.vue";
import MainLeftDrawer from "layouts/primary/MainLeftDrawer.vue";
import MainCarousel from "components/MainCarousel.vue";
import BaseEmoji from "components/BaseEmoji.vue";
import BaseEmojiPicker from "components/BaseEmojiPicker.vue";

export default async ({ Vue }) => {
  Vue.component("BaseEmojiPicker", BaseEmojiPicker);
  Vue.component("BaseEmoji", BaseEmoji);
  Vue.component("BasePage", BasePage);
  Vue.component("DarkMode", DarkMode);
  Vue.component("LeftMenuLink", LeftMenuLink);
  Vue.component("MainHeader", MainHeader);
  Vue.component("PageHeader", PageHeader);
  Vue.component("PageSubHeader", PageSubHeader);
  Vue.component("PageText", PageText);
  Vue.component("BaseBtn", BaseBtn);
  Vue.component("BaseCard", BaseCard);
  Vue.component("MainLeftDrawer", MainLeftDrawer);
  Vue.component("MainCarousel", MainCarousel);
};
