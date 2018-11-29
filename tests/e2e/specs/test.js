// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {

    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)

    // Shorthand to stop typing browser.expect over and over
    const be = browser.expect

    be.element('#main-div').to.be.present
    be.element('#main-div h1').text.to.equal('JSONAPI Vuex Test App')

    be.element('#raw_data').to.be.present
    be.element('#raw_data h2').text.to.equal('Raw Data')

    // Values from initial API get in table
    be.element('#render_data').to.be.present
    be.element('#render_data h2').text.to.equal('Rendered Data')
    be.element('#span_name').text.to.equal('sprocket')
    be.element('#span_color').text.to.equal('black')

    // Expanded related objects
    be.element('#relspan_relname').text.to.equal('widgets')
    be.element('#relspan_name').text.to.equal('spring')
    be.element('#relspan_color').text.to.equal('silver')

    // Inputs exist and have correct values
    be.element('#inputs').to.be.present
    be.element('#input_name').value.to.be.equal('sprocket')
    be.element('#input_color').value.to.be.equal('black')

    // Modify values
    browser.clearValue('#input_name')
    browser.setValue('#input_name', 'cog')
    browser.clearValue('#input_color')
    browser.setValue('#input_color', 'red')

    // Move so that element is in view (Firefox doesn't render items off-screen)
    browser.getLocationInView('button[name=patch_button]')
    browser.click('button[name=patch_button]')
    // Pause for API response
    browser.pause(1000)

    // Check changes propagate
    be.element('#span_name').text.to.equal('cog')
    be.element('#span_color').text.to.equal('red')

    browser.end()
  }
}
