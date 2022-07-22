export default class MockIntersectionObserver {
  private __onChange: any;
  constructor(onChange: any) {
    this.__onChange = onChange;
  }
  observe(): null {
    return null;
  }
  disconnect(): null {
    return null;
  }
  unobserve(): null {
    return null;
  }
}
