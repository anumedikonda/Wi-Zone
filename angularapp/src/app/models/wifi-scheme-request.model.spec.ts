import { WifiSchemeRequest } from "./wifi-scheme-request.model";

describe('WifiSchemeRequest Model', () => {

  fit('Frontend_should_create_an_instance_WifiSchemeRequest_with_defined_properties', () => {
    // Create a sample WifiSchemeRequest object
    const request: WifiSchemeRequest = {
      wifiSchemeRequestId: 301,
      userId: 123,
      wifiSchemeId: 456,
      requestDate: new Date('2024-11-26'),
      status: 'Pending',
      comments: 'Please expedite the setup process.',
      proof: 'base64EncodedProofString',
      streetName: 'Main Street',
      landmark: 'Near Central Park',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      preferredSetupDate: new Date('2024-11-30'),
      timeSlot: '10:00 AM - 12:00 PM'
    };

    expect(request).toBeTruthy();
    expect(request.wifiSchemeRequestId).toBeDefined();
    expect(request.userId).toBeDefined();
    expect(request.wifiSchemeId).toBeDefined();
    expect(request.requestDate).toBeDefined();
    expect(request.status).toBeDefined();
    expect(request.comments).toBeDefined();
    expect(request.proof).toBeDefined();
    expect(request.streetName).toBeDefined();
    expect(request.landmark).toBeDefined();
    expect(request.city).toBeDefined();
    expect(request.state).toBeDefined();
    expect(request.zipCode).toBeDefined();
    expect(request.preferredSetupDate).toBeDefined();
    expect(request.timeSlot).toBeDefined();
  });
});
