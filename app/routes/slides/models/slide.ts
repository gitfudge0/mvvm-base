import SlideType from "../enums/SlideType.enum";

export default interface Slide {
  id: number;
  type: SlideType;
  title: string;
  description: string[];
  img?: string;
}
