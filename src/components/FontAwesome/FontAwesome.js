import { library } from "@fortawesome/fontawesome-svg-core";
import {fab, faGoogle, faTwitterSquare, faFacebook, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
import {fas, faBars, faSearch, faTimes, faEnvelope, faEye} from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
    library.add(fab, faGoogle, faTwitterSquare, faFacebook, faLinkedin, faGithub);
    library.add(fas, faBars, faSearch, faTimes, faEnvelope,faEye)
}
export default initFontAwesome;