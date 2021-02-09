import { library } from "@fortawesome/fontawesome-svg-core";
import {fab, faGoogle, faTwitterSquare, faFacebook, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";

function initFontAwesome() {
    library.add(fab, faGoogle, faTwitterSquare, faFacebook, faLinkedin, faGithub);
}
export default initFontAwesome;