import { useEffect, useState } from 'react';

import { Status, StatusLightColor } from '@/components/icons/StatusLight';

import { useSupportedBuilders } from './useSupportedBuilders';

export const alwaysSelectedBuilders = ['flashbots'];

export enum Hints {
  calldata = 'calldata',
  logs = 'logs',
  defaultLogs = 'default_logs',
  contractAddress = 'contract_address',
  functionSelector = 'function_selector',
  hash = 'hash',
}

export const alwaysSelectedHints = [Hints.hash];

const defaultRefundShare = 90;

const defaultRefundAddress = 'txorigin';

export const useURLState = () => {
  const [backToSummary, setBackToSummary] = useState<boolean>(false);
  const [fastMode, setFastMode] = useState<boolean>(false);

  // state storage
  const [builders, setBuilders] = useState<string[]>(alwaysSelectedBuilders);
  const [hints, setHints] = useState<string[]>([]);
  const [refundShare, setRefundShare] = useState<number>(defaultRefundShare);
  const [refundAddress, setRefundAddress] =
    useState<string>(defaultRefundAddress);

  // outputs
  const [urlParams, setUrlParams] = useState<string>();
  const [privacyScore, setPrivacyScore] = useState<Status>({
    lightColor: StatusLightColor.Gray,
    text: 'Medium',
  });
  const [speedScore, setSpeedScore] = useState<Status>({
    lightColor: StatusLightColor.Gray,
    text: 'Medium',
  });
  const [refundScore, setRefundScore] = useState<Status>({
    lightColor: StatusLightColor.Gray,
    text: 'Medium',
  });

  // all builders
  const supportedBuilders = useSupportedBuilders();

  // on mount, set builders from URL
  useEffect(() => {
    const url = new URL(window.location.href);

    // set builders from URL
    const paramBuilders = url.searchParams.getAll('builder');
    setBuilders([
      ...alwaysSelectedBuilders,
      ...paramBuilders.filter(
        (builder) => !alwaysSelectedBuilders.includes(builder),
      ),
    ]);

    // set hints from URL
    const paramHints = url.searchParams.getAll('hint');
    if (paramHints.length === 0) {
      setHints([Hints.hash, Hints.defaultLogs]);
    } else {
      setHints([
        ...alwaysSelectedHints,
        ...paramHints.filter(
          (hint) => !alwaysSelectedHints.includes(hint as Hints),
        ),
      ]);
    }

    // set refund share from URL
    const paramRefundShare = url.searchParams.get('refund');
    if (paramRefundShare) {
      const [address, share] = paramRefundShare.split(':');
      setRefundAddress(address as string);
      setRefundShare(Number(share));
    }

    // set backToSummary from URL
    setBackToSummary(url.searchParams.get('fromSummary') === 'true');

    // set fastMode from URL
    const selectedFastMode = url.searchParams.get('fast') === 'true';
    setFastMode(selectedFastMode);
  }, []);

  // construct URL params
  useEffect(() => {
    const params = new URLSearchParams();

    // for builders
    builders
      .filter((builder) => !alwaysSelectedBuilders.includes(builder))
      .forEach((builder) => params.append('builder', builder));
    setUrlParams(params.toString());

    // for hints
    hints.forEach((hint) => {
      //  if the user is not choosing full privacy then hash should never be in the URL.
      if (hint === Hints.hash && hints.length > 1) return;
      params.append('hint', hint);
    });

    // for refund share
    if (
      (refundShare !== defaultRefundShare || refundAddress) &&
      refundShare !== undefined
    ) {
      params.append('refund', `${refundAddress}:${refundShare.toString()}`);
    }

    setUrlParams(params.toString());
  }, [builders, hints, refundShare, refundAddress]);

  // calculate summary stats
  useEffect(() => {
    // privacy
    if (fastMode) {
      setPrivacyScore({
        lightColor: StatusLightColor.Gray,
        text: 'Medium',
      });
    } else if (hints.length === 1 && hints[0] === Hints.hash) {
      setPrivacyScore({
        lightColor: StatusLightColor.Green,
        text: 'High',
      });
    } else if (hints.includes(Hints.logs) || hints.includes(Hints.calldata)) {
      setPrivacyScore({
        lightColor: StatusLightColor.Red,
        text: 'Low',
      });
    } else {
      setPrivacyScore({
        lightColor: StatusLightColor.Yellow,
        text: 'Medium',
      });
    }

    // speed
    if (fastMode) {
      setSpeedScore({
        lightColor: StatusLightColor.Green,
        text: 'Fast',
      });
    } else if (builders.length === 1 && builders[0] === 'flashbots') {
      // Just flashbots = always slow
      setSpeedScore({
        lightColor: StatusLightColor.Red,
        text: 'Slow',
      });
    } else if (refundShare > 90) {
      if (builders.length === supportedBuilders.length) {
        // All builders, refund share >90% we could make it medium
        setSpeedScore({
          lightColor: StatusLightColor.Yellow,
          text: 'Medium',
        });
      } else {
        // Any other combo of builders, >90% refund share would make inclusion speed slow
        setSpeedScore({
          lightColor: StatusLightColor.Red,
          text: 'Slow',
        });
      }
    } else if (builders.length === supportedBuilders.length) {
      // All builders = fast
      setSpeedScore({
        lightColor: StatusLightColor.Green,
        text: 'Fast',
      });
    } else {
      // Any other combo of builders = medium
      setSpeedScore({
        lightColor: StatusLightColor.Yellow,
        text: 'Medium',
      });
    }

    // refund
    if (fastMode) {
      // fast mode is the same as default
      setRefundScore({
        lightColor: StatusLightColor.Yellow,
        text: 'Medium',
      });
    } else if (hints.length === 1 && hints[0] === Hints.hash) {
      setRefundScore({
        lightColor: StatusLightColor.Red,
        text: 'Low',
      });
    } else if (hints.includes(Hints.logs) || hints.includes(Hints.calldata)) {
      setRefundScore({
        lightColor: StatusLightColor.Green,
        text: 'High',
      });
    } else {
      setRefundScore({
        lightColor: StatusLightColor.Yellow,
        text: 'Medium',
      });
    }
  }, [builders, hints, refundShare, fastMode]);

  return {
    builders,
    setBuilders,
    hints,
    setHints,
    refundShare,
    setRefundShare,
    refundAddress,
    setRefundAddress,
    urlParams,
    privacyScore,
    speedScore,
    refundScore,
    backToSummary,
    fastMode,
  };
};
