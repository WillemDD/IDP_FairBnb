angular.
module('discussionList').
component('discussionList', {
  templateUrl: 'coop-disc/coop-disc.template.html',
  controller: function discussionListController($http, $scope, discussionsService, discussionDetailService, $uibModal) {
    var self = this;
    $scope.service = discussionDetailService;
    $scope.discussions = discussionsService;

    $scope.createDiscussion = function() {
      console.log('YEAG');
      console.log($scope.discussions.list);
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'coop-disc/new-discuss.template.html',
        controller: 'NewDiscussionModalInstanceCtrl',
        controllerAs: '$ctrl'
      });

      modalInstance.result.then(function (new_discussion) {
        discussionsService.add(new_discussion);
      });
    };

    $scope.openDiscussion = function(discussion) {
      $scope.service.discussion = discussion;
      $scope.service.detailOpened = 'true';
    };
  }
})
.controller('NewDiscussionModalInstanceCtrl', function ($scope, user, $uibModalInstance, $state) {
  $scope.user = user;
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.submit = function() {
    new_discussion = {
      author: user.username,
      usr_img: user.image,
      type: 'open',
      title: $scope.title,
      body: $scope.body
    }

    $uibModalInstance.close(new_discussion);


  };
})
.component('discussionDetail', {
  templateUrl: 'coop-disc/discussion-detail.template.html',
  controller: function discussionDetailController($http, discussionDetailService, $scope) {
    var self = this; 
    $scope.discussion = discussionDetailService.discussion;
    $scope.back = function() {
      discussionDetailService.detailOpened = 'false';
    }
  }
})
.factory('discussionsService', function($http) {
  self = this;
  self.discussions = {
    list: [],
    add: function(new_discussion) {
      this.list.push(new_discussion);
    }
  };

  $http.get('../data/coop-disc.json').then(function(response) {
      self.discussions.list = response.data;
  });
  
  return self.discussions;
})
.factory('discussionDetailService', function() {
  return {
    discussion: undefined,
    detailOpened: 'false'
  };
});