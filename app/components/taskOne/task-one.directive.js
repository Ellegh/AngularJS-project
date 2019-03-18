let fileReaderDirective = function () {
    return {
        scope: {
            fileReader:"="
        },
        link: function(scope, element) {
            element.on('change', function(changeEvent) {
                const files = changeEvent.target.files;
                if (files.length) {
                    const r = new FileReader();
                    r.onload = function(e) {
                        const contents = e.target.result;
                        scope.$apply(function () {
                            scope.fileReader = contents;
                        });
                    };

                    r.readAsText(files[0]);
                }
            });
        }
    };
}

export default fileReaderDirective;