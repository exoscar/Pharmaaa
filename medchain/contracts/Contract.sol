// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineContract {
    struct Medicine {
        // address owner;
        string MedicineName;
        uint256 NationalDrugCode;
        string[] Conditions;
     
        address Manufacturer;
        string Quantity;
        string status;
        MedicineDetails medicineDetails; // Use the MedicineDetails struct
    }

    struct MedicineDetails {
        string[] Ingredients;
        string[] sideEffects;
        string ExpiryDate;
        string ManufacturingDate;
        string BatchNumber;
        string Price;
    }

    mapping(uint256 => Medicine) public medicines;
    uint256 public medicineCount;

    event MedicineAdded(uint256 indexed NationalDrugCode, string MedicineName);
    event MedicineUpdated(uint256 indexed NationalDrugCode);


    function addMedicine(
        // address _owner,
        string memory _MedicineName,
        uint256 _NationalDrugCode,
        string[] memory _Conditions,
        
        address  _Manufacturer,
        string memory _Quantity,
        string memory _status,
        string[] memory _Ingredients,
        string[] memory _sideEffects,
        string memory _ExpiryDate,
        string memory _ManufacturingDate,
        string memory _BatchNumber,
        string memory _Price
    ) public {
        require(medicines[_NationalDrugCode].NationalDrugCode == 0, "Medicine with this NDC already exists");

        Medicine memory newMedicine = createMedicine(
            // _owner,
            _MedicineName,
            _NationalDrugCode,
            _Conditions,
         
            _Manufacturer,
            _Quantity,
            _status
        );

        MedicineDetails memory details = createMedicineDetails(
            _Ingredients,
            _sideEffects,
            _ExpiryDate,
            _ManufacturingDate,
            _BatchNumber,
            _Price
        );

        newMedicine.medicineDetails = details;
        medicines[_NationalDrugCode] = newMedicine;
        medicineCount++;

        emit MedicineAdded(_NationalDrugCode, _MedicineName);
    }

 function updateMedicine(
       
        uint256 _NationalDrugCode,  
        string memory _status
    ) public {
        require(medicines[_NationalDrugCode].NationalDrugCode != 0, "Medicine with this NDC does not exist");

        Medicine storage existingMedicine = medicines[_NationalDrugCode];
        
       
        existingMedicine.status = _status;
      
        emit MedicineUpdated(_NationalDrugCode);
    }


function getMedicine(uint256 _NationalDrugCode) public view returns (
    // address owner,
    string memory MedicineName,
    uint256 NationalDrugCode,
    string[] memory Conditions,
  
    address  Manufacturer,
    string memory Quantity,
    string memory status,
    string[] memory Ingredients,
    string[] memory sideEffects,
    string memory ExpiryDate,
    string memory ManufacturingDate,
    string memory BatchNumber,
    string memory Price
) {
    require(medicines[_NationalDrugCode].NationalDrugCode != 0, "Medicine with this NDC does not exist");

    Medicine storage medicine = medicines[_NationalDrugCode];
    MedicineDetails storage details = medicine.medicineDetails;

    return (
        // medicine.owner,
        medicine.MedicineName,
        medicine.NationalDrugCode,
        medicine.Conditions,
        
        medicine.Manufacturer,
        medicine.Quantity,
        medicine.status,
        details.Ingredients,
        details.sideEffects,
        details.ExpiryDate,
        details.ManufacturingDate,
        details.BatchNumber,
        details.Price
    );
}

    // Internal function to create a Medicine struct
    function createMedicine(
        // address _owner,
        string memory _MedicineName,
        uint256 _NationalDrugCode,
        string[] memory _Conditions,
       
        address  _Manufacturer,
        string memory _Quantity,
        string memory _status
    ) internal pure returns (Medicine memory) {
        return Medicine({
            // owner: _owner,
            MedicineName: _MedicineName,
            NationalDrugCode: _NationalDrugCode,
            Conditions: _Conditions,
           
            Manufacturer: _Manufacturer,
            Quantity: _Quantity,
            status: _status,
            medicineDetails: MedicineDetails({
                Ingredients: new string[](0),
                sideEffects: new string[](0),
                ExpiryDate: "",
                ManufacturingDate: "",
                BatchNumber: "",
                Price: ""
            })
        });
    }

    // Internal function to create a MedicineDetails struct
    function createMedicineDetails(
        string[] memory _Ingredients,
        string[] memory _sideEffects,
        string memory _ExpiryDate,
        string memory _ManufacturingDate,
        string memory _BatchNumber,
        string memory _Price
    ) internal pure returns (MedicineDetails memory) {
        return MedicineDetails({
            Ingredients: _Ingredients,
            sideEffects: _sideEffects,
            ExpiryDate: _ExpiryDate,
            ManufacturingDate: _ManufacturingDate,
            BatchNumber: _BatchNumber,
            Price: _Price
        });
    }
}


//0x91c0c6A4d42839985De0722f403855f6730314EA  -- latest one contract deployed