import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-guided-changeover-batch-preparation";
const { Page, generateMetadata, dynamic } = createUseCasePage(slug);

export { generateMetadata, dynamic };
export default Page;

