import { Method, Resolution } from "./types";
import { WrapRequest, WrapResponse } from "../types";
import * as Format from "@truffle/codec/format";

/**
 * This error indicates that no overloads matched when performing
 * overload resolution.  If there was only one plausible match,
 * a [[TypeMismatchError]] will be thrown instead.
 * @category Errors
 */
export class NoOverloadsMatchedError extends Error {
  methods: Method[];
  inputs: any[];
  userDefinedTypes: Format.Types.TypesById;
  constructor(
    methods: Method[],
    inputs: any[],
    userDefinedTypes: Format.Types.TypesById
  ) {
    const message = "Arguments provided did not match any overload";
    super(message);
    this.methods = methods;
    this.inputs = inputs;
    this.userDefinedTypes = userDefinedTypes;
    this.name = "NoOverloadsMatchedError";
  }
}

/**
 * This error indicates that multiple overloads matched during
 * overload resolution, but none of them was the unique best
 * overload.
 * @category Errors
 */
export class NoUniqueBestOverloadError extends Error {
  resolutions: Resolution[];
  constructor(resolutions: Resolution[]) {
    const message =
      "Could not determine a unique best overload for the given arguments.  " +
      "Please specify the overload explicitly or give the arguments more explicit types.";
    super(message);
    this.resolutions = resolutions;
    this.name = "NoUniqueBestOverloadError";
  }
}

/**
 * This error indicates that the given input could not be recognized as the
 * type it was supposed to be.
 * @category Errors
 */
export class TypeMismatchError extends Error {
  variableName: string;
  reason: string;
  dataType: Format.Types.Type;
  input: any;

  constructor(
    dataType: Format.Types.Type,
    input: any,
    variableName: string,
    reason: string
  ) {
    const message = `Could not interpret input for ${variableName} as type ${Format.Types.typeString(
      dataType
    )}.  Reason: ${reason}`;
    super(message);
    this.variableName = variableName;
    this.dataType = dataType;
    this.input = input;
    this.reason = reason;
    this.name = "TypeMismatchError";
  }
}

export class BadResponseTypeError extends Error {
  request: WrapRequest;
  response: WrapResponse;

  constructor(request: WrapRequest, response: WrapResponse) {
    const message = `Got response type ${response.kind} to request type ${request.kind}`;
    super(message);
    this.request = request;
    this.response = response;
    this.name = "BadResponseTypeError";
  }
}