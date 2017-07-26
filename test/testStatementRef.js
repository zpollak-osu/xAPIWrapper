describe("StatementRef Test:", () => {
  // StatementRef objects to test
  let def, invalidId, noId;

  let actor = {'mbox':'mailto:userone@example.com'};

  // Response Types
  const OK = 200;
  const NO_CONTENT = 204;
  const BAD_REQUEST = 400;

  // Testing module functionality
  let should, XAPIWrapper, Util, Statement, StatementRef, verbs;

  // Test statements
  let s1, s2, s3;

  before(() => {
    def = {
      "objectType": "StatementRef",
      "id": "12345678-1234-5678-1234-567812345678"
    }
    noId = {"objectType": "StatementRef"}
    invalidId = {
      "objectType": "StatementRef",
      "id": ""
    }

    // Require necessary modules
    should = require('should');
    XAPIWrapper = require('./../src/xAPIWrapper');
    Util = require('./../src/Utils.js');
    Statement = require('./../src/statement').Statement;
    StatementRef = require('./../src/object').StatementRef;
    verbs = require('./../src/verbs');

    XAPIWrapper.changeConfig({
      "endpoint": "https://lrs.adlnet.gov/xapi/",
      "user": "aaron",
      "password": "1234",
      "strictCallbacks": true
    });

    s1 = new Statement(actor, verbs.attempted, def);
    s2 = new Statement(actor, verbs.attempted, noId);
    s3 = new Statement(actor, verbs.attempted, invalidId);
  });

  describe("StatementRef constructor test:", () => {
    it("should pass with valid id string", () => {
      ((new StatementRef(s1.id)).isValid()).should.eql(true);
    });
    it("should fail with empty parameters", () => {
      (!(new StatementRef()).isValid()).should.eql(true);
    });
  });

  describe("JSON Object as statement object:", () => {
    it("should pass calling isValid() on statementref objects", () => {
      (s1.object.isValid()).should.eql(true);
      (!s2.object.isValid()).should.eql(true);
      (!s3.object.isValid()).should.eql(true);
    });
    it("should pass with valid id & objectType object", (done) => {
      XAPIWrapper.postStatement(s1, (error, resp, data) => {
        (!error).should.eql(true);
        resp.status.should.eql(OK);
        resp.ok.should.eql(true);

        done();
      });
    });
    it("should fail with undefined id", (done) => {
      XAPIWrapper.postStatement(s2, (error, resp, data) => {
        error.should.not.eql(null);

        done();
      });
    });
    it("should fail with invalid id", (done) => {
      XAPIWrapper.postStatement(s3, (error, resp, data) => {
        error.should.not.eql(null);

        done();
      });
    });
  });

  describe("StatementRef Object as statement object:", () => {
    before(() => {
      s1 = new Statement(actor, verbs.suspended, new StatementRef(def));
      s2 = new Statement(actor, verbs.suspended, new StatementRef(noId));
      s3 = new Statement(actor, verbs.suspended, new StatementRef(invalidId));
    });

    it("should pass calling isValid() on statementref objects", () => {
      (s1.object.isValid()).should.eql(true);
      (!s2.object.isValid()).should.eql(true);
      (!s3.object.isValid()).should.eql(true);
    });
    it("should pass with valid id & objectType", (done) => {
      XAPIWrapper.postStatement(s1, (error, resp, data) => {
        (!error).should.eql(true);
        resp.status.should.eql(OK);
        resp.ok.should.eql(true);

        done();
      });
    });
    it("should fail with undefined id", (done) => {
      XAPIWrapper.postStatement(s2, (error, resp, data) => {
        error.should.not.eql(null);

        done();
      });
    });
    it("should fail with invalid id", (done) => {
      XAPIWrapper.postStatement(s3, (error, resp, data) => {
        error.should.not.eql(null);

        done();
      });
    });
  });

});
