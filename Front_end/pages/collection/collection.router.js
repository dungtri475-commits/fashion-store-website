import { navigateToCollectionDetail } from "./collection_detail/collection_detail.js";
import { navigateToCollectionLanding } from "./collection_landing_page/collection_landing_page.js";

export function handleCollectionRoute(childRoutes = []) {
    const [screen = "landing", id = "1"] = childRoutes;

    if (screen === "detail") {
        navigateToCollectionDetail(id);
        return;
    }

    navigateToCollectionLanding(id);
}
