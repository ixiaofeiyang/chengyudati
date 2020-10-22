Component({
    properties: {},
    data: {},
    methods: {
        componentCancel: function() {
            this.triggerEvent("cancel");
        },
        componentLogin: function(t) {
            var t = t.detail;
            this.triggerEvent("confirm", {
                result: t
            });
        }
    }
});