import { Feedback } from "./feedback.model";

describe('Feedback Model', () => {

  fit('Frontend_Feedback_model_should_create_an_instance_with_defined_properties', () => {
    // Create a sample Feedback object
    const feedback: Feedback = {
      feedbackId: 101,
      userId: 1,
      wifiSchemeId: 202,
      category: 'Service',
      feedbackText: 'This is a feedback text.',
      date: new Date('2024-07-02')
    };

    expect(feedback).toBeTruthy();
    expect(feedback.feedbackId).toBe(101);
    expect(feedback.userId).toBe(1);
    expect(feedback.wifiSchemeId).toBe(202);
    expect(feedback.category).toBe('Service');
    expect(feedback.feedbackText).toBe('This is a feedback text.');
    expect(feedback.date).toEqual(new Date('2024-07-02'));
  });


});
