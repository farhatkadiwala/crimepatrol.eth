// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

error NotCaseAdmin();

contract CaseTest {

    uint256 private caseCounter = 0;

    enum CaseState {
        OPEN,
        CLOSED
    }

    struct Case {
        uint256 caseId; // Case ID, this helps to access the case from the list, same as its index position in the list
        address caseAdmin; // The Address of the Person who creates the Case will be stored here
        string caseTitle; // Title of the Case
        string caseDescription; // Description of the Case
        uint256 caseCreatedTime; // When Case was Created
        uint256 caseUpdatedTime; // When Case was last Updated
        uint256 firNumber;
        string caseInvestigationOfficer;
        string locationsOfCrime;
        CaseState caseState; // State of the Case, A Case can be updated only if the case is in Open State
    }

    Case[] listOfCases;

    // Function to create a Case, anybody can do it
    function createCase(string memory caseTitle, string memory caseDesc, uint256 firNo, string memory invgOfficer, string memory locations) public {
        Case memory newCase = Case(caseCounter, msg.sender, caseTitle, caseDesc, block.timestamp, block.timestamp, firNo, invgOfficer, locations, CaseState.OPEN);
        listOfCases.push(newCase);
        caseCounter++;
    }

    // Returns every detail about the Case
    function getCaseDetails(uint256 caseIndex) public view returns (Case memory) {
        return listOfCases[caseIndex];
    }

    // Updates the Case, only the CaseAdmin can do this, returns a tuple
    function updateCase(uint256 caseId, string memory caseDesc) public {
        if (msg.sender != listOfCases[caseId].caseAdmin) {
            revert NotCaseAdmin();
        }

        listOfCases[caseId].caseDescription = caseDesc;
        listOfCases[caseId].caseUpdatedTime = block.timestamp;
    }
}