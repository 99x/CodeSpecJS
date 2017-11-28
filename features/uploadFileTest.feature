Feature: I want test uploading a file
    Scenario: upload image test 1
        Given Navigate to "https://www.jqueryscript.net/demo/Image-Upload-Preview-Plugin-With-jQuery-Bootstrap-img-upload/"
        Then I Upload "C:\Users\NIvedithaK\Desktop\doggie.jpg" to "uploadbutton" with the "xpath" of "/html/body/div[2]/form/div/div/div[2]/div/span[1]/input"
        Then Wait for "3" seconds

    Scenario: upload image test 2
        Given Navigate to "http://talkerscode.com/webtricks/demo/demo_preview-image-before-upload-using-javascript.php"
        Then Wait for "Choose Button" with the "xpath" of "//*[@id='wrapper']/input" to appear
        When I Upload "C:\Users\NIvedithaK\Documents\Deathstar.png" to "Choose File" with the "xpath" of "//*[@id='wrapper']/input"
        When Wait for "3" seconds
