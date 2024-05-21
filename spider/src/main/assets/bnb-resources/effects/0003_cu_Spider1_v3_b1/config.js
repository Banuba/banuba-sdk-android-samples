function Effect() {
    var self = this;
    this.waitTime = 0;

    //
    // Костыль для ожидания в течение одной секунды после конца эффекта перед его сбросом.
    // Эффект нужно ресетить с задержкой т.к в противном случае модели сбрасываются 
    // раньше, чем открывается окно preivew.
    //

    this.waitForASecond = function () {
        if( (new Date()).getTime() > self.waitTime ) {
            Api.showHint("Open mouth");
            Api.stopSound("Big_Spider_sfx.ogg");

            Api.meshfxReset();
            Api.meshfxMsg("spawn",    0, 0, "!glfx_FACE");
            Api.meshfxMsg("spawn",    1, 0, "tarantula.bsm2");
            Api.meshfxMsg("animLoop", 1, 0, "StartIdle");

            self.faceActions = [self.waitForTrigger];
        }
    }

    this.walk = function() {
        if( (new Date()).getTime() > self.waitTime ) {
            Api.recordStop();
            self.waitTime = self.waitTime + 2000;
            self.faceActions = [self.waitForASecond];
        }
    };

    this.waitForTrigger = function() {
        if(Api.isMouthOpen()) {
            Api.hideHint();

            Api.meshfxMsg("animOnce", 1, 0, "Walk");
            self.waitTime = (new Date()).getTime() + 12166.7;
            self.faceActions = [self.walk];

            //self.faceActions = []; // !!!
            Api.playSound("Big_Spider_sfx.ogg", false, 1);
        }
    };

    this.init = function() {
        Api.showRecordButton();

        Api.showHint("Open mouth");
        Api.meshfxMsg("spawn",    0, 0, "!glfx_FACE");
        Api.meshfxMsg("spawn",    1, 0, "tarantula.bsm2");
        Api.meshfxMsg("animLoop", 1, 0, "StartIdle");
        Api.playSound("Big_Spider_Action_Mode.ogg", true, 1);
        self.faceActions = [this.waitForTrigger];
    };


    this.restart = function() {
        Api.meshfxReset();
        Api.stopSound("Big_Spider_sfx.ogg");
        Api.stopSound("Big_Spider_Action_Mode");
        self.init();

    };
    /*
    this.videoRecordDiscardActions = function () {
        //
        // После короткой записи делаем полный reset эффекта
        // 

        Api.showHint("Open mouth");
        Api.stopSound("Big_Spider_sfx.aac");

        Api.meshfxReset();
        Api.meshfxMsg("spawn",    0, 0, "!glfx_FACE");
        Api.meshfxMsg("spawn",    1, 0, "tarantula.bsm2");
        Api.meshfxMsg("animLoop", 1, 0, "StartIdle");

        self.faceActions = [self.waitForTrigger];
    };
    */

    this.faceActions = [];
    //this.faceActions = [this.waitForTrigger];
    this.noFaceActions = [];

    this.videoRecordStartActions = [];
    this.videoRecordDiscardActions = [this.restart];
    this.videoRecordFinishActions = [];
}

configure(new Effect());
