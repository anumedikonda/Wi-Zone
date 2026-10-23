import { WifiScheme } from "./wifi-scheme.model";

describe('WifiScheme Model', () => {

  fit('Frontend_should_create_an_instance_WiFiScheme_with_defined_properties', () => {
    // Create a sample WiFiScheme object
    const scheme: WifiScheme = {
      wifiSchemeId: 201,
      schemeName: 'High-Speed Broadband',
      description: 'A high-speed broadband connection for home and office use.',
      region: 'Urban',
      speed: '100 Mbps',
      dataLimit: 'Unlimited',
      fee: 500,
      availabilityStatus: 'Available'
    };

    expect(scheme).toBeTruthy();
    expect(scheme.wifiSchemeId).toBeDefined();
    expect(scheme.schemeName).toBeDefined();
    expect(scheme.description).toBeDefined();
    expect(scheme.region).toBeDefined();
    expect(scheme.speed).toBeDefined();
    expect(scheme.dataLimit).toBeDefined();
    expect(scheme.fee).toBeDefined();
    expect(scheme.availabilityStatus).toBeDefined();
  });

});
