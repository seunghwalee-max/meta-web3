import { getAddresses } from "../addresses";
import { getABI } from "../helpers";

class Governance {
  async init({ web3, branch }) {
    this.addresses = getAddresses();
    const { GOV_ADDRESS } = this.addresses;
    this.govAbi = await getABI(branch, "GovImp");
    this.govInstance = new web3.eth.Contract(this.govAbi.abi, GOV_ADDRESS);
  }

  async getBallotLength() {
    if (!this.govInstance || !this.govInstance.methods.ballotLength) return;
    return this.govInstance.methods.ballotLength().call();
  }

  async getModifiedBlock() {
    if (!this.govInstance || !this.govInstance.methods.modifiedBlock) return;
    return this.govInstance.methods.modifiedBlock().call();
  }

  async getVoteLength() {
    if (!this.govInstance || !this.govInstance.methods.voteLength) return;
    return this.govInstance.methods.voteLength().call();
  }

  /**
   *
   * @param {address} addr
   */
  async isMember(addr) {
    if (!this.govInstance || !this.govInstance.methods.isMember) return;
    return this.govInstance.methods.isMember(addr).call();
  }

  // for test
  async getMember() {
    return this.govInstance.methods.getMember(1).call();
  }

  /**
   *
   * @param {uint256} idx
   * @param {boolean} approval
   */
  vote(idx, approval) {
    if (!this.govInstance || !this.govInstance.methods.vote) return;
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods.vote(idx, approval).encodeABI(),
    };
  }

  /**
   *
   * @param {address} member
   * @param {bytes} name
   * @param {bytes} enode
   * @param {bytes} ip
   * @param {uint256[2]} [port, lockAmount]
   * @param {bytes} memo
   */
  addProposalToAddMember(member, name, enode, ip, [port, lockAmount], memo) {
    if (!this.govInstance || !this.govInstance.methods.addProposalToAddMember)
      return;
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods
        .addProposalToAddMember(
          member,
          name,
          enode,
          ip,
          [port, lockAmount],
          memo
        )
        .encodeABI(),
    };
  }

  /**
   *
   * @param {address} [target, nMember]
   * @param {bytes} nName
   * @param {bytes} nEnode
   * @param {bytes} nIp
   * @param {uint} [nPort, ockAmount]
   * @param {bytes} memo
   */
  addProposalToChangeMember(
    [target, nMember],
    nName,
    nEnode,
    nIp,
    [nPort, lockAmount],
    memo
  ) {
    if (
      !this.govInstance ||
      !this.govInstance.methods.addProposalToChangeMember
    )
      return;
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods
        .addProposalToChangeMember(
          [target, nMember],
          nName,
          nEnode,
          nIp,
          [nPort, lockAmount],
          memo
        )
        .encodeABI(),
    };
  }

  /**
   *
   * @param {address} member
   * @param {uint256} lockAmount
   * @param {bytes} memo
   */
  addProposalToRemoveMember(member, lockAmount, memo) {
    if (
      !this.govInstance ||
      !this.govInstance.methods.addProposalToRemoveMember
    )
      return;
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods
        .addProposalToRemoveMember(member, lockAmount, memo)
        .encodeABI(),
    };
  }

  /**
   *
   * @param {address} newGovAddr
   * @param {bytes} memo
   */
  addProposalToChangeGov(newGovAddr, memo) {
    if (!this.govInstance || !this.govInstance.methods.addProposalToChangeGov)
      return;
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods
        .addProposalToChangeGov(newGovAddr, memo)
        .encodeABI(),
    };
  }

  /**
   *
   * @param {bytes32} envName
   * @param {uint256} envType
   * @param {bytes} envVal
   * @param {bytes} memo
   */
  addProposalToChangeEnv(envName, envType, envVal, memo) {
    if (!this.govInstance || !this.govInstance.methods.addProposalToChangeEnv)
      return;
    return {
      to: this.addresses.GOV_ADDRESS,
      data: this.govInstance.methods
        .addProposalToChangeEnv(envName, envType, envVal, memo)
        .encodeABI(),
    };
  }
}

export { Governance };
