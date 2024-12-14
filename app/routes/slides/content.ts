import SlideType from "./enums/SlideType.enum";
import Slide from "./models/slide";

const Content: Slide[] = [
  {
    id: 1,
    type: SlideType.SPLIT,
    title: "React: A Library, Not a Framework",
    description: [
      "React provides UI rendering capabilities",
      "No built-in architectural standards",
      "Developers must create their own patterns",
    ],
  },
  {
    id: 2,
    type: SlideType.SPLIT,
    title: "Enter MVVM",
    description: [
      "Brings structure to React applications",
      "Clear separation of data, logic, and UI",
      "Separates concerns effectively",
      "Improves code maintainability and testability",
      "Easier debugging and maintenance",
    ],
  },
  {
    id: 4,
    type: SlideType.SPLIT,
    title: "State Management with Zustand",
    description: [
      "Lightweight state management library",
      "Simple and flexible API",
      "Minimal boilerplate",
      "Easy to integrate with MVVM pattern",
    ],
  },
  {
    id: 6,
    type: SlideType.SOLO,
    title: "Store Setup with Zustand",
    description: [],
    img: "/store.png",
  },
  {
    id: 7,
    type: SlideType.SPLIT,
    title: "ViewModel Implementation",
    description: [
      "Implement business logic layer",
      "Coordinate between model and view",
      "Handle data fetching and transformations",
      "Manage application state logic",
    ],
    img: "/mvvm.png",
  },
  {
    id: 8,
    type: SlideType.SPLIT,
    title: "Custom Page Hook",
    description: [
      "Create page-specific hook",
      "Initialize view model and stores",
      "Provide convenient access to view logic",
      "Centralize page-level initialization",
    ],
    img: "/pagehook.png",
  },
  {
    id: 18,
    type: SlideType.SOLO,
    title: "Putting it all together",
    description: [],
    img: "/alltogether.png",
  },
  {
    id: 19,
    type: SlideType.SOLO,
    title: "Using the page hook",
    description: [],
    img: "/usage.png",
  },
  {
    id: 9,
    type: SlideType.SPLIT,
    title: "Optimization: React Context",
    description: [
      "Solve view model instance proliferation",
      "Use React Context for distribution",
      "Prevent unnecessary object creation",
    ],
    img: "/context.png",
  },
  {
    id: 29,
    type: SlideType.SOLO,
    title: "Context usage",
    description: [],
    img: "/contextuse.png",
  },
  {
    id: 10,
    type: SlideType.SOLO,
    title: "Let's take a closer look",
    description: [],
  },
  {
    id: 11,
    type: SlideType.SPLIT,
    title: "MVVM: The Not-So-Great Parts",
    description: [
      "Increased initial development time",
      "More boilerplate code",
      "Steeper learning curve",
      "Potential over-engineering for simple apps",
      "Requires team-wide adoption and understanding",
    ],
  },
  {
    id: 12,
    type: SlideType.SPLIT,
    title: "When to Use MVVM",
    description: [
      "Complex, large-scale applications",
      "Projects requiring high maintainability",
      "Teams prioritizing clean architecture",
      "Applications with complex business logic",
    ],
  },
  {
    id: 32,
    type: SlideType.SOLO,
    title: "Thank you",
    description: [],
  },
];

export default Content;
