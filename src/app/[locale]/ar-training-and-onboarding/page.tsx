import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-training-and-onboarding";
const { Page, generateMetadata } = createUseCasePage(slug);

export { generateMetadata };
export default Page;

