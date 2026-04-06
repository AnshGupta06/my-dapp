// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CourseCertificate
 * @dev Soulbound NFT Certificate for course completion.
 * Non-transferable once minted.
 */
contract CourseCertificate is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    struct CertificateData {
        string courseName;
        uint256 completionDate;
        string[] skills;
        address recipient;
        string metadataURI;
    }

    mapping(uint256 => CertificateData) public certificates;
    mapping(address => mapping(string => bool)) public hasMinted;

    event CertificateMinted(address indexed recipient, uint256 tokenId, string courseName);

    constructor() ERC721("Course Certificate", "CERT") Ownable(msg.sender) {}

    /**
     * @dev Mint a new certificate.
     * For demo purposes, we're allowing direct minting.
     * In production, this should be restricted to the owner/backend.
     */
    function mintCertificate(
        address to,
        string memory courseName,
        string[] memory skills,
        string memory metadataURI
    ) public returns (uint256) {
        require(!hasMinted[to][courseName], "Certificate already minted for this course");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(to, tokenId);
        
        certificates[tokenId] = CertificateData({
            courseName: courseName,
            completionDate: block.timestamp,
            skills: skills,
            recipient: to,
            metadataURI: metadataURI
        });

        hasMinted[to][courseName] = true;

        emit CertificateMinted(to, tokenId, courseName);
        
        return tokenId;
    }

    /**
     * @dev Returns the certificate data for a given token ID.
     */
    function getCertificate(uint256 tokenId) public view returns (CertificateData memory) {
        _requireOwned(tokenId);
        return certificates[tokenId];
    }

    /**
     * @dev Overridden tokenURI to return the metadata URI stored at minting.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return certificates[tokenId].metadataURI;
    }

    /**
     * @dev Overriding transfer functions to make the token SOULBOUND.
     */
    function transferFrom(address from, address to, uint256 tokenId) public override {
        revert("Soulbound: non-transferable");
    }

    function safeTransferFrom(address from, address to, uint128 tokenId) public {
         revert("Soulbound: non-transferable");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override {
        revert("Soulbound: non-transferable");
    }
}
